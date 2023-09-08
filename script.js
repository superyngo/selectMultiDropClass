import {newSelectors} from "./selectToDrop.js";

//submit value using .getValue()
const getValueButton = document.querySelector(".getValueButton");
getValueButton.addEventListener("click", () => {
  newSelectors.forEach((newSelector) => {
    console.log(newSelector.Value);
  });
});
