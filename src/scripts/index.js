import { loginRequest } from "./requests.js"

function handleLogin() {
  const inputs = document.querySelectorAll('.login__input')
  const button = document.querySelector('.login__button')
  const loginBody = {}
  let count = 0

  button.addEventListener('click', async (event) => {
    event.preventDefault()

    inputs.forEach(({name, value}) => {
      if(value === '') {
        count++
      }

      loginBody[name] = value
    })

    if(count !== 0) {
      return alert('por favor preencha os campos e tente novamente')
    } else {
      const token = await loginRequest(loginBody)

      console.log(token)
      return token
    }
  })
}

handleLogin()