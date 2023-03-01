import { handleComplete, handleDeleteTask } from "./dashboard.js";
import { readAllTasks } from "./requests.js";

export async function render() {
  const list = document.querySelector(".list__container");

  list.innerHTML = "";

  const array = await readAllTasks()

  array.forEach((task) => {
    const card = createCard(task);

    list.appendChild(card);
  });

  handleComplete();
  handleDeleteTask();
}

function createCard({ id, title, description, created_at, completed }) {
  const cardContainer = document.createElement("li");
  const cardHeaderContainer = document.createElement("header");
  const cardtitle = document.createElement("h2");
  const cardButtonsContainer = document.createElement("div");
  const cardCompleted = document.createElement("img");
  const cardTrash = document.createElement("img");
  const cardDescription = document.createElement("p");
  const cardBar = document.createElement("div");
  const cardDate = document.createElement("p");

  cardContainer.classList.add("card__container");

  cardHeaderContainer.classList.add("card__header");

  cardtitle.classList.add("card__title");
  cardtitle.innerText = title;

  cardButtonsContainer.classList.add("card__buttons--container");

  cardCompleted.src = "../assets/completed-icon.svg";
  cardCompleted.alt = "completed icon";
  cardCompleted.dataset.taskId = id;
  cardCompleted.id = "completeTaskButton";
  cardCompleted.classList.add("card__completed");

  cardTrash.src = "../assets/trash-icon.svg";
  cardTrash.alt = "Trash icon";
  cardTrash.dataset.taskId = id;
  cardTrash.id = "deleteTaskButton";
  cardTrash.classList.add("card__deleted");

  cardDescription.classList.add("card__description");
  cardDescription.innerText = description;

  cardBar.classList.add("card__bar");
  if (completed) {
    cardBar.classList.add("card__bar--completed");
    cardCompleted.classList.add("card__completed--completed");
  } else {
    cardBar.classList.add("card__bar--pending");
  }

  cardDate.classList.add("card__date");
  cardDate.innerText = new Date(created_at).toLocaleDateString();

  cardButtonsContainer.append(cardCompleted, cardTrash);
  cardHeaderContainer.append(cardtitle, cardButtonsContainer);
  cardContainer.append(cardHeaderContainer, cardDescription, cardBar, cardDate);

  return cardContainer;
}
