// Function to handle the submission of a new post
document.getElementById('create-post-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the post title and content from the form fields
    let title = document.getElementById('post-title').value.trim();
    let content = document.getElementById('post-content').value.trim();
    
    if (title && content) {
        // Create a new post element
        let postContainer = document.createElement('div');
        postContainer.classList.add('post');
        
        // Add the title and content to the post
        postContainer.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <div class="actions">
                <button class="like-button" onclick="increaseLikes(this)">Like (<span class="like-count">0</span>)</button>
                <button class="comment-button" onclick="toggleComments(this)">Comment</button>
                <div class="comments-section" style="display:none;">
                    <input type="text" class="comment-input" placeholder="Write a comment..." />
                    <button class="submit-comment" onclick="submitComment(this)">Submit Comment</button>
                    <div class="comments"></div>
                </div>
            </div>
        `;
        
        // Append the new post to the posts section
        document.querySelector('#posts .container').appendChild(postContainer);
        
        // Clear the form fields
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
    }
});

// Function to handle increasing likes
function increaseLikes(button) {
    let likeCount = button.querySelector('.like-count');
    let currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = currentLikes + 1;
}

// Function to toggle the visibility of the comment section
function toggleComments(button) {
    let commentsSection = button.closest('.actions').querySelector('.comments-section');
    commentsSection.style.display = (commentsSection.style.display === 'none' || commentsSection.style.display === '') ? 'block' : 'none';
}

// Function to submit and display a new comment
function submitComment(button) {
    let commentInput = button.closest('.comments-section').querySelector('.comment-input');
    let commentText = commentInput.value.trim();

    if (commentText) {
        let commentsDiv = button.closest('.comments-section').querySelector('.comments');
        let newComment = document.createElement('p');
        newComment.innerHTML = `<strong>You:</strong> ${commentText}`;
        commentsDiv.appendChild(newComment);
        commentInput.value = '';  // Clear the input field
    }
}

