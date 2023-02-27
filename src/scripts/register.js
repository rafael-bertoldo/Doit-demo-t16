import { registerRequest } from "./requests.js"

function handleSignup() {
  const inputs = document.querySelectorAll('.signup__input')
  const button = document.querySelector('.signup__button')
  const signupBody = {}
  let count = 0

  button.addEventListener('click', async (event) => {
    event.preventDefault()

    inputs.forEach(input => {
      if(input.value === '') {
        count++
      }

      signupBody[input.name] = input.value
    })

    if(count !== 0) {
      return alert('por favor preencha todos os campos necessários para realizar o cadastro')
    } else {
      const newUser = await registerRequest(signupBody)

      console.log(newUser)
      return newUser
    }

  })
}

handleSignup()