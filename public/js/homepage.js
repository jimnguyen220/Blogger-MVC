



const newBlogFormHandler = async (event) => {
    event.preventDefault();

    const heading = document.querySelector('#blog-heading').value.trim();
    const content = document.querySelector('#blog-content').value;

    const response = await fetch('/api/users/blog' , {
        method: 'POST',
        body: JSON.stringify({heading, content}),
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert('Failed to update post.');
    }

};

document
    .querySelector('.blog-form')
    .addEventListener('submit', newBlogFormHandler);