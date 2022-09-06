// This goes in the public folder
const ul = document.querySelector('ul')

ul.addEventListener('click', (e) => {
  
  if (Array.from(e.target.classList).includes('bi-pencil-square')) {
    const [paragraph, text] = Array.from(
      e.target.parentNode.parentNode.children
    ) 
   
    paragraph.classList.toggle('hidden')
    text.classList.toggle('hidden')
    text.classList.toggle('active')
    console.log(paragraph)
    console.log(text)
    console.log(e.target.parentNode.parentNode.children)
  } else console.log('that was a different button')
})

const proeccessSubmission = (e) => {
  e.preventDefault()
  const id = e.target.parentNode.id
  const taskDescription = e.target.children[0].value
  console.log(e)
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

//Adding event listener for DELETE methods
const deleteTaskBtn = document.querySelectorAll('.bi-x-circle') //adding selector to all X buttons

Array.from(deleteTaskBtn).forEach((element) => {
  element.addEventListener('click', taskDelete) // adding click event to each X button
})

async function taskDelete() {
  const taskId = this.parentNode.parentNode.id // looking into the task element and grabbing its ID given from MongoDB
  console.log(taskId)

  try {
    const response = await fetch('/deleteTask', {
      // awaiting data to come from deleteExercise ping
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: taskId,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}
