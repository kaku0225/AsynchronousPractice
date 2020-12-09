document.addEventListener('DOMContentLoaded', () => {
  fetch('https://pastleo-posts-api.herokuapp.com/api/posts')
    .then(response => response.json())
    .then(posts => {
      const post = posts[0];
      document.querySelector('.post-created-at').textContent = post.created_at;
      document.querySelector('.post-author').textContent = `By ${post.author}`;
      const postTitleA = document.querySelector('a.post-title');
      postTitleA.textContent = post.title;
      postTitleA.href = post.url;
      const descriptionDiv = document.querySelector('.post-description')
      descriptionDiv.textContent = post.description;

      const postLinkA = document.querySelector('.post-link');
      postLinkA.classList.remove('hidden');
      postLinkA.href = post.url;
    })
});

