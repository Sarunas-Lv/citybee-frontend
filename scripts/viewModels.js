//imports
import {
  VEHICLES_URI,
  MODELS_URI,
  MODELS_COUNT_URI,
} from '../modules/endpoints/endpoints.js';
console.log(VEHICLES_URI, MODELS_URI, MODELS_COUNT_URI);
// vars
const modelsCountOutputElement = document.querySelector('#output');
const modelsOutputElement = document.querySelector('#models-output');
// functs
const showModels = () => {
  return fetch(MODELS_URI)
    .then((res) => res.json())
    .then((data) => {
      modelsOutputElement.innerHTML = data.reduce((total, item) => {
        total += `
        <tr>
        <td>${item.model}</td>
        <td>${item.name}</td>
        <td>${item.hour_price} €/h </td>
        </tr>
        `;
        return total;
      }, '');
    });
};
const showModelsCount = () => {
  let arrayOfModels = [];
  fetch(MODELS_URI)
    .then((res) => res.json())
    .then((data) =>
      data.reduce((total, item) => {
        total += item.name;
        return arrayOfModels.push(total), console.log(arrayOfModels);
      }, '')
    );
  const showAllVehicles = (e) => {
    fetch(MODELS_COUNT_URI)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.reduce((total, item) => {
          let arrayNum = +item.model - 1;
          total += `
          <tr>
          <td>Name: ${arrayOfModels[arrayNum]}</td>
          <td>Count: ${item.count}</td>
          </tr>`;
          return (modelsCountOutputElement.innerHTML = total);
        }, '');
      });
  };
  return showAllVehicles();
};

// evs
document.addEventListener('DOMContentLoaded', showModels);
document.addEventListener('DOMContentLoaded', showModelsCount);
