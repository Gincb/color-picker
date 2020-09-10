"use strict";

window.addEventListener("load", getDefaultColor);

let colorPicker = document.querySelector("#colorpicker");
let resultColor = document.querySelector("#picked-color");
let resultHEX = document.querySelector(".hex");
let resultRGB = document.querySelector(".rgb");
let resultHSL = document.querySelector(".hsl");

function getDefaultColor() {
  resultColor.style.backgroundColor = colorPicker.value;
  colorPicker.addEventListener("change", getColor);
}

function getColor() {
  resultColor.style.backgroundColor = getHex(colorPicker.value);
  resultHEX.textContent = getHex(colorPicker.value);
  resultRGB.textContent = `${getRGB(colorPicker.value).r}, ${
    getRGB(colorPicker.value).g
  }, ${getRGB(colorPicker.value).b}`;
  getHSL();
}

function getHex(HEXResult) {
  return HEXResult;
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
  return { r: +r, g: +g, b: +b };
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

  return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
}

function getHSL() {
  let HSLResult = convertToHSL(
    getRGB(colorPicker.value).r,
    getRGB(colorPicker.value).g,
    getRGB(colorPicker.value).b
  );

  resultHSL.textContent = `${HSLResult.h}, ${HSLResult.s}%, ${HSLResult.l}%`;
}
