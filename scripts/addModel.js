//imports
import { MODELS_URI } from '../modules/endpoints/endpoints.js';
// VARIABLES
// DOM ELEMENTS
const addModelFormElement = document.querySelector('form');
// FUNCTIONS
const addNewModel = async (e) => {
  let modelNum = '';
  e.preventDefault();
  await fetch(MODELS_URI)
    .then((res) => res.json())
    .then((data) => {
      return (modelNum = +data.length + 1), console.log(modelNum);
    });

  let model = {
    model: modelNum,
    name: e.target.modelName.value,
    hour_price: +e.target.modelHourPrice.value,
  };
  return await fetch(MODELS_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};
// EVENTS
addModelFormElement.addEventListener('submit', addNewModel);
