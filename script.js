"use strict";

window.addEventListener("load", getDefaultColor);

let colorPicker = document.querySelector("#colorpicker");
let resultColor = document.querySelector("#resultColor");
let resultHEX = document.querySelector(".hex");
let resultRGB = document.querySelector(".rgb");
let resultHSL = document.querySelector(".hsl");

function getDefaultColor() {
  resultColor.style.backgroundColor = colorPicker.value;
  colorPicker.addEventListener("change", getColor);
}

function getColor() {
  resultColor.style.backgroundColor = colorPicker.value;
  resultColor.style.backgroundColor = colorPicker.value;
  getHex();
  resultRGB.textContent = getRGB(colorPicker.value);
  getHSL();
}

function getHex() {
  resultHEX.textContent = colorPicker.value;
}

function getRGB(hex) {
  let r = 0,
    g = 0,
    b = 0;

  // if hex is 3 digits + #
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];

    // if hex is 6 digits + #
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  return "rgb(" + +r + ", " + +g + ", " + +b + ")";
}

function convertToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return `hsl(${Math.round(h)}%, ${Math.round(s)}%, ${Math.round(l)}%)`; // just for testing
}

function getHSL() {
  let sliceRGB = resultRGB.textContent.slice(4, -1);
  let splitRGB = sliceRGB.split(",");
  resultHSL.textContent = convertToHSL(splitRGB[0], splitRGB[1], splitRGB[2]);
}
