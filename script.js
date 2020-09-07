"use strict";

let colorPicker = document.querySelector("#colorpicker");
let resultColor = document.querySelector("#resultColor");
let resultHEX = document.querySelector(".hex");

colorPicker.addEventListener("change", getColor);

function getColor() {
  resultColor.style.backgroundColor = colorPicker.value;
  getHex();
}

function getHex() {
  resultHEX.textContent = colorPicker.value;
}
