class MultiDropSelect {
  target = {};
  selectedLabels = new Set();
  innerPart = {
    selectedLabelBar: null,
    selectionPanel: null,
    optionsCheckbox: [],
    openOptionButton: null,
  };
  html = {
    targetOptions: (target) =>
      [...target.children].reduce((newHTML, children) => {
        newHTML += `
        <li>
          <label class="optionLabel">
            <input id=${children.innerText} class="optionCheckbox" type="checkbox" value="${children.innerText}"/>
            <span>${children.innerText}</span>
          </label>
        </li>
      `;
        return newHTML;
      }, ``),
    wrapper: (targetOptions) => `   
      <div class="selectedLabelBarContainer">
        <span class="selectedLabelBar"></span>
        <button class="openOptionButton">🔻</button>
      </div>
      <div class="selectionPanelContainer">
        <div class="selectionPanel">
          ${targetOptions}
        </div>
      </div>
      `,
    selectedLabels: (selectedLabels) =>
      [...selectedLabels].reduce((newHTML, label) => {
        newHTML += `<span class="selectedLabel">${label}</span>`;
        return newHTML;
      }, ""),
  };
  constructor(target) {
    if (!target || target.tagName != "SELECT")
      throw new Error("Need Select Element");
    this.target = target;
  }
  swap() {
    const multiDropWrapper = document.createElement("div");
    multiDropWrapper.className = "multiDropWrapper";
    multiDropWrapper.innerHTML = this.html.wrapper(
      this.html.targetOptions(this.target)
    );
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
    this.swap();
    this.setInnerPart();
    this.innerPart.openOptionButton.addEventListener("click", () => {
      this.innerPart.selectionPanel.parentElement.classList.toggle("open");
    });
    this.innerPart.optionsCheckbox.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
          this.selectedLabels.add(e.target.value);
        } else {
          this.selectedLabels.delete(e.target.value);
        }
        this.render();
      });
    });
  }
  render() {
    this.innerPart.selectedLabelBar.innerHTML = this.html.selectedLabels(
      this.selectedLabels
    );
  }
  get Value() {
    return [...this.selectedLabels];
  }
}

const newSelectors = [...document.querySelectorAll("select")].map(
  (selector) => {
    const newSelector = new MultiDropSelect(selector);
    newSelector.preRender();
    return newSelector;
  }
);

export {newSelectors};
