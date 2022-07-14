// This goes in the public folder
const ul = document.querySelector('ul')

ul.addEventListener('click', (e) => {
  if (Array.from(e.target.classList).includes('modify')) {
    const [paragraph, text] = Array.from(
      e.target.parentNode.parentNode.children
    )
    paragraph.classList.toggle('hidden')
    text.classList.toggle('hidden')
  }
})

const proeccessSubmission = (e) => {
  e.preventDefault()
  const id = e.target.parentNode.id
  const taskDescription = e.target.children[0].value
  const options = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ id, taskDescription }), // body data type must match "Content-Type" header
  }

  fetch('http://localhost:3001/', options).then((res) => {
    location.reload()
  })
}

// Add event listeners to forms
Array.from(document.querySelectorAll('form.edit')).forEach((el) => {
  el.addEventListener('submit', proeccessSubmission)
})
