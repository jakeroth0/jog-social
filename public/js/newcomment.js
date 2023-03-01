const newcommentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#post_id').value;

    console.log(comment_text);
    console.log('comment_text is above______________________________');
    console.log(post_id);
    

    if (comment_text) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({ comment_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Failed to add comment');
            console.log(req.body)
        }
    }
};

document
    .querySelector('.new-comment')
    .addEventListener('submit', newcommentFormHandler);