import {newSelects} from "./selectToDrop.js";

//submit value using .getValue()
const getValueButton = document.querySelector(".getValueButton");
getValueButton.addEventListener("click", () => {
  newSelects.forEach((newSelector) => {
    console.log(newSelector.Value);
  });
});
