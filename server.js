const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
// const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

//sets up sessions
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//Set Handlebars  as the default templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//directory for css/js/images
app.use(express.static("public"));

app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });
});
