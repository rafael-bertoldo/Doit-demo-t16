const token = localStorage.getItem('@doit:token')
const baseUrl = 'http://localhost:3333'
const requestHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}

export async function loginRequest(loginBody) {
  const token = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(loginBody)
  })
  .then(response => {
    if(response.ok) {
      const responseJson = response.json().then(res => {
        localStorage.setItem('@doit:token', JSON.stringify(res.token))

        return res
      })

      return responseJson
    } else {
      response.json(resError => console.log(resError))
    }
  })

  return token
}

export async function registerRequest(registerBody) {
  const newUser = await fetch(`${baseUrl}/users/create`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(registerBody)
  })
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      response.json(resError => console.log(resError))
    }
  })

  return newUser
}