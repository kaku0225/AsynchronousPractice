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

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    form.querySelectorAll('.error').forEach(errorSpan => {
      errorSpan.textContent = '';
    });

    const formData = new FormData(form);

    const request = await fetch(
      'https://pastleo-posts-api.herokuapp.com/api/posts',
      {
        method: 'POST',
        headers: { 'Authorization': 'pastleo-js-posts-api-secret' },
        body: formData,
      }
    )
    
    submitBtn.classList.remove('loading');

    if (request.ok) {
      submitBtn.textContent = 'Done!'

      form.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
      })
    } else {
      submitBtn.textContent = 'Error!'

      const errors = await request.json();

      form.querySelectorAll('.error').forEach(errorSpan => {
        const errorMsgs = errors[errorSpan.parentNode.htmlFor];
        if (errorMsgs) {
          errorSpan.textContent = errorMsgs.join(', ');
        }
      });
    }

    await timeoutPromise(2000);
    submitBtn.textContent = 'Submit'
    submitBtn.disabled = false;
  });
})
