//imports
import {
  VEHICLES_URI,
  MODELS_URI,
  MODELS_COUNT_URI,
} from '../modules/endpoints/endpoints.js';
// vars
// dom els
const addVehicleFormElement = document.querySelector('.add-vehicle');
const selectModelElement = document.querySelector('.chooseModel');
// functs
const showModels = () => {
  return fetch(MODELS_URI)
    .then((res) => res.json())
    .then((data) => {
      // removing duplicates from select
      const key = 'name';
      const filterData = [
        ...new Map(data.map((item) => [item[key], item])).values(),
      ];
      // Showing options in select
      selectModelElement.innerHTML = filterData.reduce((total, currentItem) => {
        total += `
<option value='${currentItem.model}'>${currentItem.name}</option>
  `;
        return total;
      }, '');
    });
};

const addNewVehicle = (e) => {
  e.preventDefault();

  let vehicle = {
    model: e.target.chooseModel.value,
    number_plate: e.target.numberPlate.value,
    country_location: e.target.country.value,
  };

  return fetch(VEHICLES_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
// evs
addVehicleFormElement.addEventListener('submit', addNewVehicle);
document.addEventListener('DOMContentLoaded', showModels);
