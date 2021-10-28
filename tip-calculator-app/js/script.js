const $ = (id) => {
  return document.querySelector(`${id}`);
};

let bill = 0;
let people = 0;
let tip = 0;
let tipPerPerson = 0;

document.querySelectorAll(".tip-amount-btn").forEach((btn) => {
  btn.setAttribute("onclick", "getTipPercent(this)");
});

$("#custom-tip").addEventListener("change", (e) => {
  document.querySelectorAll(".tip-amount-btn").forEach((btn) => {
    btn.classList.remove("active-btn");
  });
  tip = +e.target.value;
  updateResult(tip);
});
$("#bill-amount").addEventListener("change", (e) => {
  bill = +e.target.value;
  updateResult(tip);
});
$("#no-of-people").addEventListener("change", (e) => {
  people = +e.target.value;
  updateResult(tip);
});
function getTipPercent(btn) {
  document.querySelectorAll(".tip-amount-btn").forEach((btn) => {
    btn.classList.remove("active-btn");
  });
  $("#custom-tip").value = "";
  btn.classList.add("active-btn");
  tip = +btn.value;
  updateResult(tip);
}

$(".reset-btn").addEventListener("click", () => {
  document.querySelectorAll(".tip-amount-btn").forEach((btn) => {
    btn.classList.remove("active-btn");
  });
  tip = people = tipPerPerson = bill = 0;
  $("#bill-amount").value = "";
  $("#no-of-people").value = "";
  $("#custom-tip").value = "";
  $("#tip-amount").innerText = "$" + tipPerPerson;
});

const updateResult = (tip) => {
  let isInteger = true;
  document
    .querySelectorAll(".error>span")
    .forEach((error) => (error.style.display = "none"));

  let regex = /[^0-9]/g;
  if (bill < 1) {
    document.querySelector(".bill-error>span").style.display = "block";
  } else if (people < 1 || regex.test(people)) {
    isInteger = false;
    document.querySelector(".people-error>span").style.display = "block";
  } else if (tip < 1) {
    document.querySelector(".tip-error>span").style.display = "block";
  }
  if (bill && people && tip > 0 && isInteger) {
    let totalTip = bill * (tip / 100);
    tipPerPerson = totalTip / people;
    let totalBill = bill + totalTip;
    $("#tip-amount").innerText = "$" + parseFloat(tipPerPerson.toFixed(2));

    let billPerPerson = totalBill / people;
    $("#total").innerText = "$" + parseFloat(billPerPerson.toFixed(2));

    $(".reset-btn").style.opacity = 1;
    $(".reset-btn").style.cursor = "pointer";
    $(".reset-btn").classList.add("hover-class");
  }
};
