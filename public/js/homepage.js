const newBlogFormHandler = async (event) => {
    event.preventDefault();

    const heading = document.querySelector('#blog-heading').value.trim();
    const content = document.querySelector('#blog-content').value;

    const response = await fetch('/api/blog' , {
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

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            //update this to get back to homepage
            document.location.replace('/');
        } else {
            alert('Failed to delete post');
        }
    }
};

const updButtonHandler = async (event) => {
    event.preventDefault();

    const heading = document.querySelector('#blog-heading').value.trim();
    const content = document.querySelector('#blog-content').value;

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({heading, content}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            //update this to get back to homepage
            document.location.replace('/');
        } else {
            alert('Failed to update post')
        }
    }
};

document
    .querySelector('.blog-form')
    .addEventListener('submit', newBlogFormHandler);

document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('.blog-update')
    .addEventListener('click', updButtonHandler);