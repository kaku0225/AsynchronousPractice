const timeoutPromise = ms => new Promise((resolve, _reject) => {
  setTimeout(() => {
    resolve();
  }, ms);
})

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-post-form');
  const submitBtn = form.querySelector('button[type=submit]');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    // let's start coding

    form.querySelectorAll('error').forEach(errspan => {
      errspan.textContent = ''
    })
    submitBtn.classList.add('loading')
    submitBtn.disabled = true

    const request = await fetch('https://pastleo-posts-api.herokuapp.com/api/posts', {
      method: 'POST',
      headers: {
        Authorization: 'pastleo-js-posts-api-secret',
      },
      body: new FormData(form)
    })

    submitBtn.classList.remove('loading')

    if (request.ok){
      submitBtn.textContent = 'Success!'
      form.querySelectorAll('input, textarea').forEach(input => {
        input.value = ''
      })
    } else {
      submitBtn.textContent = 'Error!'
      const errors = await request.json()
      form.querySelectorAll('input, textarea').forEach(input => {
        if (errors[input.name]){
          input.parentElement.querySelector('.error').textContent = errors[input.name].join(', ')
        }
      })
    }

    setTimeout(() => {
      submitBtn.textContent = 'Submit'
      submitBtn.disabled = false
    }, 1500)
  });
})
