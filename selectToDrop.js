class MultiDropSelect {
  target = {};
  targetSelected = new Set();
  innerPart = {
    selectedLabelBar: null,
    selectionPanel: null,
    optionsCheckbox: [],
    openOptionButton: null,
  };
  html = {
    wrapper: ``,
    targetOptions: ``,
    selectedLabels: ``,
  };
  constructor(target) {
    if (!target || target.tagName != "SELECT")
      throw new Error("Need Select Element");
    this.target = target;
  }
  setMainHTML() {
    this.html.targetOptions = [...this.target.children].reduce(
      (newHTML, children) => {
        newHTML += `
        <li>
          <label class="optionLabel">
            <input id=${children.innerText} class="optionCheckbox" type="checkbox" value="${children.innerText}"/>
            <span>${children.innerText}</span>
          </label>
        </li>
      `;
        return newHTML;
      },
      ``
    );
    this.html.wrapper = `   
        <div class="selectedLabelBarContainer">
          <span class="selectedLabelBar"></span>
          <button class="openOptionButton">🔻</button>
        </div>
        <div class="selectionPanelContainer">
          <div class="selectionPanel">
            ${this.html.targetOptions}
          </div>
        </div>
    `;
  }
  swap() {
    const multiDropWrapper = document.createElement("div");
    multiDropWrapper.className = "multiDropWrapper";
    multiDropWrapper.innerHTML = this.html.wrapper;
    this.target.replaceWith(multiDropWrapper);
    this.target = multiDropWrapper;
  }
  setInnerPart() {
    this.innerPart.selectedLabelBar =
      this.target.querySelector(".selectedLabelBar");
    this.innerPart.selectionPanel =
      this.target.querySelector(".selectionPanel");
    this.innerPart.optionsCheckbox = [
      ...this.target.querySelectorAll(".optionCheckbox"),
    ];
    this.innerPart.openOptionButton =
      this.target.querySelector(".openOptionButton");
  }
  preRender() {
    this.setMainHTML();
    this.swap();
    this.setInnerPart();
    this.innerPart.openOptionButton.addEventListener("click", () => {
      this.innerPart.selectionPanel.parentElement.classList.toggle("open");
    });
    this.innerPart.optionsCheckbox.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
          this.targetSelected.add(e.target.value);
        } else {
          this.targetSelected.delete(e.target.value);
        }
        this.render();
      });
    });
  }
  render() {
    this.html.selectedLabels = [...this.targetSelected].reduce(
      (string, label) => {
        string += `<span class="selectedLabel">${label}</span>`;
        return string;
      },
      ""
    );
    this.innerPart.selectedLabelBar.innerHTML = this.html.selectedLabels;
  }
  getValue() {
    return [...this.targetSelected];
  }
}

const allSelects = [...document.querySelectorAll("select")];
export const newSelectors = [];
allSelects.forEach((selector) => {
  newSelectors.push(new MultiDropSelect(selector));
});
newSelectors.forEach((newSelector) => {
  newSelector.preRender();
});
