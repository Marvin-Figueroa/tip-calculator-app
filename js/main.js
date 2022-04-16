const inputCustomTip = document.querySelector(".input-custom-tip");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const btnReset = document.querySelector(".btn-reset");
const priceRegEx = /^\d+(?:[.]\d+)*$/;

inputCustomTip.addEventListener("focus", () => {
  uncheckCurrentTip();
});

billInput.addEventListener("focus", () => {
  billInput.parentElement.classList.add("focused");
});

billInput.addEventListener("blur", () => {
  billInput.parentElement.classList.remove("focused");
});

peopleInput.addEventListener("focus", () => {
  peopleInput.parentElement.classList.add("focused");
});

peopleInput.addEventListener("blur", () => {
  peopleInput.parentElement.classList.remove("focused");
});

peopleInput.addEventListener("change", () => {
  if (validateInputs()) {
    calculateTotals();
    btnReset.classList.remove("disabled");
  }
});

btnReset.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  inputCustomTip.value = "";
  uncheckCurrentTip();
  document
    .querySelectorAll(".money")
    .forEach((field) => (field.textContent = "$0.00"));
  billInput.parentElement.classList.remove("bill-input-error");
  inputCustomTip.classList.remove("input-custom-tip-error");
  peopleInput.parentElement.classList.remove("people-input-error");
  btnReset.classList.add("disabled");
});

function uncheckCurrentTip() {
  if (document.querySelector(".button-check:checked"))
    document.querySelector(".button-check:checked").checked = false;
}

function validateInputs() {
  const billAmount = Number(billInput.value);
  const peopleAmount = Number(peopleInput.value);
  const customTip = Number(inputCustomTip.value);
  const selectedTip = document.querySelector(".button-check:checked")
    ? true
    : false;
  let allCorrect = true;

  const isValidBillAmount = priceRegEx.test(billAmount) && billAmount > 0;
  const isValidCustomTip = priceRegEx.test(customTip) && customTip > 0;

  if (!isValidBillAmount) {
    billInput.parentElement.classList.add("bill-input-error");
    allCorrect = false;
  } else {
    billInput.parentElement.classList.remove("bill-input-error");
  }

  if (!selectedTip) {
    if (!isValidCustomTip) {
      inputCustomTip.classList.add("input-custom-tip-error");
      allCorrect = false;
    } else {
      inputCustomTip.classList.remove("input-custom-tip-error");
    }
  } else {
    inputCustomTip.classList.remove("input-custom-tip-error");
  }

  if (peopleAmount <= 0) {
    peopleInput.parentElement.classList.add("people-input-error");
    allCorrect = false;
  } else {
    peopleInput.parentElement.classList.remove("people-input-error");
  }

  return allCorrect;
}

function calculateTotals() {
  const billAmount = Number(billInput.value);
  const peopleAmount = Number(peopleInput.value);

  const tipPercent = document.querySelector(".button-check:checked")
    ? Number(document.querySelector(".button-check:checked").id)
    : Number(inputCustomTip.value);

  const tipAmount = billAmount * (tipPercent / 100);

  const tipPerson = tipAmount / peopleAmount;

  const totalTip = (tipAmount + billAmount) / peopleAmount;

  document.querySelector(".tip-per-person").textContent = tipPerson.toFixed(2);
  document.querySelector(".total-tip").textContent = totalTip.toFixed(2);
}
