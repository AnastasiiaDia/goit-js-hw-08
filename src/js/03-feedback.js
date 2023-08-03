import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(saveData, 500));
formEl.addEventListener('submit', onFormSubmit);
window.addEventListener('load', populateForm);

populateForm();
function populateForm() {
  const savedData = getData();
  if (!Object.keys(savedData).length) return;
  {
    Object.entries(savedData).forEach(
      ([key, value]) => (formEl.elements[key].value = value)
    );
  }
}
function getData() {
  try {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error(error.message);
  }
}

function saveData(event) {
  let object = getData();
  object[event.target.name] = event.target.value.trim();
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
