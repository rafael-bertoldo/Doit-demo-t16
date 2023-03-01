const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc2NjMyODksImV4cCI6MTY3ODI2ODA4OSwic3ViIjoiNWNmNGFkNzMtYzAxOC00NWRhLTgwNzYtNTg5MmJlYzZlM2Y3In0.u1GqNw_SK7LPfXjWiKnORfeSthUlm5Hs-AzzIAQYRTE";
const baseUrl = "http://localhost:3333";
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function loginRequest(loginBody) {
  const token = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(loginBody),
  }).then((response) => {
    if (response.ok) {
      const responseJson = response.json().then((res) => {
        localStorage.setItem("@doit:token", JSON.stringify(res.token));

        return res;
      });

      return responseJson;
    } else {
      response.json((resError) => console.log(resError));
    }
  });

  return token;
}

export async function registerRequest(registerBody) {
  const newUser = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(registerBody),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      response.json((resError) => console.log(resError));
    }
  });

  return newUser;
}

export async function createTask(taskBody) {
  const newTask = await fetch(`${baseUrl}/tasks/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(taskBody),
  }).then((response) => {
    if (response.ok) {
      const taskJson = response.json().then((resJson) => {
        alert("Tarefa cadastrada com sucesso");

        return resJson;
      });
      return taskJson;
    } else {
      response.json().then(({ message }) => {
        alert(message);
      });
    }
  });

  return newTask;
}

export async function readAllTasks() {
  const tasks = await fetch(`${baseUrl}/tasks/readAll`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      response.json().then(({ message }) => {
        alert(message);
      });
    }
  });

  return tasks;
}

export async function readTaskById(taskId) {
  const task = await fetch(`${baseUrl}/tasks/${taskId}`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      response.json().then(({ message }) => {
        alert(message);
      });
    }
  });

  return task;
}

export async function updateTask(taskId, taskBody) {
  const task = await fetch(`${baseUrl}/tasks/update/${taskId}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(taskBody),
  }).then((response) => {
    if (response.ok) {
      alert("Task atualizada com sucesso");

      return response.json();
    } else {
      response.json().then(({ message }) => {
        alert(message);
      });
    }
  });

  return task;
}

export async function deleteTask(taskId) {
  const task = await fetch(`${baseUrl}/tasks/delete/${taskId}`, {
    method: "DELETE",
    headers: requestHeaders,
  }).then((response) => {
    if (response.ok) {
      alert("task deletada com sucesso");

      return response.json();
    } 
    // else {
    //   response.json().then(({ message }) => {
    //     alert(message);
    //   });
    // }
  });

  return task;
}

export async function complete(taskId) {
  const task = await fetch(`${baseUrl}/tasks/complete/${taskId}`, {
    method: "PATCH",
    headers: requestHeaders,
  }).then((response) => {
    if (response.ok) {
      alert("Tarefa concluida com sucesso");

      return response.json();
    } else {
      response.json().then(({ message }) => {
        alert(message);
      });

      return false;
    }
  });

  return task;
}

export async function uncomplete(taskId) {
  const task = await fetch(`${baseUrl}/tasks/uncomplete/${taskId}`, {
    method: "PATCH",
    headers: requestHeaders,
  }).then((response) => {
    if (response.ok) {
      alert("Tarefa retornada para pendente");

      return response.json();
    } else {
      response.json().then(({ message }) => {
        alert(message);
      });

      return false;
    }
  });

  return task;
}
