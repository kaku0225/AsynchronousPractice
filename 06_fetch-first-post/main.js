// let's start coding:
window.document.addEventListener('DOMContentLoaded', function(){
  fetch('https://pastleo-posts-api.herokuapp.com/api/posts')
  // .then(function(respon){
  //   return response.json()
  // })
  .then(response => response.json())
  // (a, b) => a + b
  // (a, b) => (a + b)

  // test = (a,b) => {
  //  console.log(a,b)
  //  return a + b
  // }
  .then(posts => {
    const firstPost = posts[0]
    const titleA = document.querySelector('.post-title')
    const linkA = document.querySelector('.post-link')
    titleA.textContent = firstPost.title
    document.querySelector('.post-created-at').textContent = firstPost.created_at
    document.querySelector('.post-author').textContent = (`By ${firstPost.author}`)
    document.querySelector('.post-description').textContent = firstPost.description
    titleA.href = firstPost.url
    linkA.href = firstPost.api_url
    linkA.classList.remove('hidden')
  })
})
