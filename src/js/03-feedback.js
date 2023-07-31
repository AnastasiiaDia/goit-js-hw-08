import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
const emailInputEl = formEl.elements.email;
const messageInputEl = formEl.elements.message;
const LOCALSTORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(saveData, 500));
formEl.addEventListener('submit', onFormSubmit);
window.addEventListener('load', populateForm);

populateForm();
function populateForm() {
  const savedData = getData();
  if (savedData) {
    emailInputEl.value = savedData.email;
    messageInputEl.value = savedData.message;
  }
}
function getData() {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function saveData(event) {
  let object = {
    email: emailInputEl.value,
    message: messageInputEl.value,
  };
  const objectJSON = JSON.stringify(object);
  localStorage.setItem(LOCALSTORAGE_KEY, objectJSON);
}
function onFormSubmit(event) {
  console.log('form submited');
  event.preventDefault();
  console.log(getData());
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formEl.reset();
}
