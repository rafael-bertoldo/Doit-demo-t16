import { render } from "./render.js";
import { complete, createTask, deleteTask, readAllTasks, uncomplete } from "./requests.js";

function showAddTaskModal() {
  const button = document.querySelector("#addTaskButton");
  const modalController = document.querySelector(".modal__controller");

  button.addEventListener("click", () => {
    modalController.showModal();
    handleNewTask();

    closeModal();
  });
}

function closeModal() {
  const button = document.querySelector("#closeModalButton");
  const modalController = document.querySelector(".modal__controller");

  button.addEventListener("click", () => {
    modalController.close();
  });
}

function handleNewTask() {
  const inputs = document.querySelectorAll(".add__input");
  const button = document.querySelector("#addTaskSubmit");
  const newTask = {};
  let count = 0;

  button.addEventListener("click", async (event) => {
    event.preventDefault();

    inputs.forEach(({ name, value }) => {
      if (value === "") {
        count++;
      }

      newTask[name] = value;
    });

    if (count !== 0) {
      return alert("Por Favor preencha os campos necessários");
    } else {
      createTask(newTask);
      render()
    }
  });
}

export function handleComplete() {
  const completeButtons = document.querySelectorAll('.card__completed')
  const cardBar = document.querySelector('.card__bar')

  completeButtons.forEach(completeButton => {
    completeButton.addEventListener('click', async (event) => {
      const completedTask = await complete(event.target.dataset.taskId)
  
      if(completedTask) {
        cardBar.classList.add('card__bar--completed')
        cardBar.classList.remove('card__bar--pending')
      }

      render(true)
    })
  })
}

export function handleUncomplete() {
  const uncompleteButtons = document.querySelectorAll('.card__completed--completed')
  const cardBar = document.querySelector('.card__bar')
  uncompleteButtons.forEach(uncompleteButton => {
    uncompleteButton.addEventListener('click', async (event) => {
      const uncompletedTask = await uncomplete(event.target.dataset.taskId)
  
      if(uncompletedTask) {
        cardBar.classList.add('card__bar--completed')
        cardBar.classList.remove('card__bar--pending')
      }
      render(true)
    })
  })
}

export function handleDeleteTask() {
  const deleteButtons = document.querySelectorAll('.card__deleted')

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', (event) => {
      deleteTask(event.target.dataset.taskId)

      render(true)
    })
  })
}

showAddTaskModal();
render(true);
