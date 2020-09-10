"use strict";

window.addEventListener("load", getDefaultColor);

let colorPicker = document.querySelector("#colorpicker");
let resultColor = document.querySelector("#picked-color");
let resultHEX = document.querySelector(".hex");
let resultRGB = document.querySelector(".rgb");
let resultHSL = document.querySelector(".hsl");

function getDefaultColor() {
  colorPicker.addEventListener("change", getColor);
}

function getColor() {
  resultColor.style.backgroundColor = getHex(colorPicker.value);
  resultHEX.textContent = getHex(colorPicker.value);
  resultRGB.textContent = `${getRGB(colorPicker.value).r}, ${
    getRGB(colorPicker.value).g
  }, ${getRGB(colorPicker.value).b}`;
  resultHSL.textContent = `${getHSL().h}, ${getHSL().s}%, ${getHSL().l}%`;
  selectOption();
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

  return { h: HSLResult.h, s: HSLResult.s, l: HSLResult.l };
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const selectScheme = document.querySelector("#color-select");
selectScheme.addEventListener("change", selectOption);

function selectOption() {
  if (selectScheme.value == "analogous") {
    addColors(analogousArray);
  } else if (selectScheme.value == "monochromatic") {
    addColors(monochromaticArray);
  } else if (selectScheme.value == "triad") {
    addColors(triadArray);
  } else if (selectScheme.value == "complementary") {
    addColors(complementaryArray);
  } else if (selectScheme.value == "compound") {
    compound();
  } else if (selectScheme.value == "shades") {
    addColors(shadesArray);
  }
}

//Get random number
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Analogous

function shiftHAnalogous(h) {
  let h1 = getRandom(h, 360);
  let h2 = getRandom(h, 360);
  let h3 = getRandom(0, h);
  let h4 = getRandom(0, h);

  return { h1, h2, h3, h4 };
}

function analogousArray() {
  let color1 = {
    hex: hslToHex(shiftHAnalogous(getHSL().h).h1, getHSL().s, getHSL().l),
    hsl: `${shiftHAnalogous(getHSL().h).h1}, ${getHSL().s}%, ${getHSL().l}%`,
    rgb: `${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h1, getHSL().s, getHSL().l)).r
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h1, getHSL().s, getHSL().l)).g
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h1, getHSL().s, getHSL().l)).b
    }`,
  };

  let color2 = {
    hex: hslToHex(shiftHAnalogous(getHSL().h).h2, getHSL().s, getHSL().l),
    hsl: `${shiftHAnalogous(getHSL().h).h2}, ${getHSL().s}%, ${getHSL().l}%`,
    rgb: `${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h2, getHSL().s, getHSL().l)).r
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h2, getHSL().s, getHSL().l)).g
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h2, getHSL().s, getHSL().l)).b
    }`,
  };

  let color3 = {
    hex: hslToHex(shiftHAnalogous(getHSL().h).h3, getHSL().s, getHSL().l),
    hsl: `${shiftHAnalogous(getHSL().h).h3}, ${getHSL().s}%, ${getHSL().l}%`,
    rgb: `${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h3, getHSL().s, getHSL().l)).r
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h3, getHSL().s, getHSL().l)).g
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h3, getHSL().s, getHSL().l)).b
    }`,
  };

  let color4 = {
    hex: hslToHex(shiftHAnalogous(getHSL().h).h4, getHSL().s, getHSL().l),
    hsl: `${shiftHAnalogous(getHSL().h).h4}, ${getHSL().s}%, ${getHSL().l}%`,
    rgb: `${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h4, getHSL().s, getHSL().l)).r
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h4, getHSL().s, getHSL().l)).g
    }, ${
      getRGB(hslToHex(shiftHAnalogous(getHSL().h).h4, getHSL().s, getHSL().l)).b
    }`,
  };

  return { color1, color2, color3, color4 };
}

//Shifting S and L for other options

function shiftS(s) {
  let s1 = getRandom(s, 100);
  let s2 = getRandom(s, 100);
  let s3 = getRandom(0, s);
  let s4 = getRandom(0, s);

  return { s1, s2, s3, s4 };
}

function shiftL(l) {
  let l1 = getRandom(l, 100);
  let l2 = getRandom(l, 100);
  let l3 = getRandom(0, l);
  let l4 = getRandom(0, l);

  return { l1, l2, l3, l4 };
}

//Monochromatic

function monochromaticArray() {
  let color1 = {
    hex: hslToHex(getHSL().h, shiftS(getHSL().s).s2, getHSL().l),
    hsl: `${getHSL().h}, ${shiftS(getHSL().s).s2}%, ${getHSL().l}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s2, getHSL().l)).r
    }, ${getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s2, getHSL().l)).g}, ${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s2, getHSL().l)).b
    }`,
  };

  let color2 = {
    hex: hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l1),
    hsl: `${getHSL().h}, ${getHSL().s}%, ${shiftL(getHSL().l).l1}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l1)).r
    }, ${getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l1)).g}, ${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l1)).b
    }`,
  };

  let color3 = {
    hex: hslToHex(getHSL().h, shiftS(getHSL().s).s3, getHSL().l),
    hsl: `${getHSL().h}, ${shiftS(getHSL().s).s3}%, ${getHSL().l}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s3, getHSL().l)).r
    }, ${getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s3, getHSL().l)).g}, ${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s3, getHSL().l)).b
    }`,
  };

  let color4 = {
    hex: hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3),
    hsl: `${getHSL().h}, ${getHSL().s}%, ${shiftL(getHSL().l).l3}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3)).r
    }, ${getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3)).g}, ${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3)).b
    }`,
  };

  return { color1, color2, color3, color4 };
}

//Triad

function shiftHTriadComplementary(h) {
  let h60 = h + 60;
  let h120 = h + 120;
  let h180 = h + 180;

  return { h60, h120, h180 };
}

function triadArray() {
  let color1 = {
    hex: hslToHex(
      shiftHTriadComplementary(getHSL().h).h120,
      getHSL().s,
      shiftL(getHSL().l).l4
    ),
    hsl: `${shiftHTriadComplementary(getHSL().h).h120}, ${getHSL().s}%, ${
      shiftL(getHSL().l).l4
    }%`,
    rgb: `${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h120,
          getHSL().s,
          shiftL(getHSL().l).l4
        )
      ).r
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h120,
          getHSL().s,
          shiftL(getHSL().l).l4
        )
      ).g
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h120,
          getHSL().s,
          shiftL(getHSL().l).l4
        )
      ).b
    }`,
  };

  let color2 = {
    hex: hslToHex(
      shiftHTriadComplementary(getHSL().h).h60,
      getHSL().s,
      getHSL().l
    ),
    hsl: `${shiftHTriadComplementary(getHSL().h).h60}, ${getHSL().s}%, ${
      getHSL().l
    }%`,
    rgb: `${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h60,
          getHSL().s,
          getHSL().l
        )
      ).r
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h60,
          getHSL().s,
          getHSL().l
        )
      ).g
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h60,
          getHSL().s,
          getHSL().l
        )
      ).b
    }`,
  };

  let color3 = {
    hex: hslToHex(
      shiftHTriadComplementary(getHSL().h).h120,
      getHSL().s,
      getHSL().l
    ),
    hsl: `${shiftHTriadComplementary(getHSL().h).h120}, ${getHSL().s}%, ${
      getHSL().l
    }%`,
    rgb: `${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h120,
          getHSL().s,
          getHSL().l
        )
      ).r
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h120,
          getHSL().s,
          getHSL().l
        )
      ).g
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h120,
          getHSL().s,
          getHSL().l
        )
      ).b
    }`,
  };

  let color4 = {
    hex: hslToHex(
      shiftHTriadComplementary(getHSL().h).h60,
      getHSL().s,
      shiftL(getHSL().l).l1
    ),
    hsl: `${shiftHTriadComplementary(getHSL().h).h60}, ${getHSL().s}%, ${
      shiftL(getHSL().l).l1
    }%`,
    rgb: `${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h60,
          getHSL().s,
          shiftL(getHSL().l).l1
        )
      ).r
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h60,
          getHSL().s,
          shiftL(getHSL().l).l1
        )
      ).g
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h60,
          getHSL().s,
          shiftL(getHSL().l).l1
        )
      ).b
    }`,
  };

  return { color1, color2, color3, color4 };
}

//Complementary

function shiftHTriadComplementary(h) {
  let h60 = h + 60;
  let h120 = h + 120;
  let h180 = h + 180;

  return { h60, h120, h180 };
}

function complementaryArray() {
  let color1 = {
    hex: hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2),
    hsl: `${getHSL().h}, ${getHSL().s}%, ${shiftL(getHSL().l).l2}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2)).r
    }, ${getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2)).g}, ${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2)).b
    }`,
  };

  let color2 = {
    hex: hslToHex(
      shiftHTriadComplementary(getHSL().h).h180,
      shiftS(getHSL().s).s4,
      getHSL().l
    ),
    hsl: `${shiftHTriadComplementary(getHSL().h).h180}, ${
      shiftS(getHSL().s).s4
    }%, ${getHSL().l}%`,
    rgb: `${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h180,
          shiftS(getHSL().s).s4,
          getHSL().l
        )
      ).r
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h180,
          shiftS(getHSL().s).s4,
          getHSL().l
        )
      ).g
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h180,
          shiftS(getHSL().s).s4,
          getHSL().l
        )
      ).b
    }`,
  };

  let color3 = {
    hex: hslToHex(getHSL().h, shiftS(getHSL().s).s3, shiftL(getHSL().l).l3),
    hsl: `${getHSL().h}, ${shiftS(getHSL().s).s3}%, ${shiftL(getHSL().l).l3}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s3, shiftL(getHSL().l).l3))
        .r
    }, ${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s3, shiftL(getHSL().l).l3))
        .g
    }, ${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s3, shiftL(getHSL().l).l3))
        .b
    }`,
  };

  let color4 = {
    hex: hslToHex(
      shiftHTriadComplementary(getHSL().h).h180,
      getHSL().s,
      getHSL().l
    ),
    hsl: `${shiftHTriadComplementary(getHSL().h).h180}, ${getHSL().s}%, ${
      getHSL().l
    }%`,
    rgb: `${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h180,
          getHSL().s,
          getHSL().l
        )
      ).r
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h180,
          getHSL().s,
          getHSL().l
        )
      ).g
    }, ${
      getRGB(
        hslToHex(
          shiftHTriadComplementary(getHSL().h).h180,
          getHSL().s,
          getHSL().l
        )
      ).b
    }`,
  };

  return { color1, color2, color3, color4 };
}

//Compund

function compound() {
  //color1
  document.querySelector(
    "#color1"
  ).style.backgroundColor = analogousArray().color1.hex;
  document.querySelector(".hex1").textContent = analogousArray().color1.hex;
  document.querySelector(".rgb1").textContent = analogousArray().color1.rgb;
  document.querySelector(".hsl1").textContent = analogousArray().color1.hsl;

  //color2
  document.querySelector(
    "#color2"
  ).style.backgroundColor = complementaryArray().color2.hex;
  document.querySelector(".hex2").textContent = complementaryArray().color2.hex;
  document.querySelector(".rgb2").textContent = complementaryArray().color2.rgb;
  document.querySelector(".hsl2").textContent = complementaryArray().color2.hsl;

  //color3
  document.querySelector(
    "#color3"
  ).style.backgroundColor = analogousArray().color3.hex;
  document.querySelector(".hex3").textContent = analogousArray().color3.hex;
  document.querySelector(".rgb3").textContent = analogousArray().color3.rgb;
  document.querySelector(".hsl3").textContent = analogousArray().color3.hsl;

  //color4
  document.querySelector(
    "#color4"
  ).style.backgroundColor = complementaryArray().color4.hex;
  document.querySelector(".hex4").textContent = complementaryArray().color4.hex;
  document.querySelector(".rgb4").textContent = complementaryArray().color4.rgb;
  document.querySelector(".hsl4").textContent = complementaryArray().color4.hsl;
}

//Shades

function shadesArray() {
  let color1 = {
    hex: hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l1),
    hsl: `${getHSL().h}, ${shiftS(getHSL().s).s1}%, ${shiftL(getHSL().l).l1}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s1, shiftL(getHSL().l).l1))
        .r
    }, ${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s1, shiftL(getHSL().l).l1))
        .g
    }, ${
      getRGB(hslToHex(getHSL().h, shiftS(getHSL().s).s1, shiftL(getHSL().l).l1))
        .b
    }`,
  };

  let color2 = {
    hex: hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3),
    hsl: `${getHSL().h}, ${getHSL().s}%, ${shiftL(getHSL().l).l3}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3)).r
    }, ${getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3)).g}, ${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l3)).b
    }`,
  };

  let color3 = {
    hex: hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l4),
    hsl: `${getHSL().h}, ${getHSL().s}%, ${shiftL(getHSL().l).l4}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l4)).r
    }, ${getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l4)).g}, ${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l4)).b
    }`,
  };

  let color4 = {
    hex: hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2),
    hsl: `${getHSL().h}, ${getHSL().s}%, ${shiftL(getHSL().l).l2}%`,
    rgb: `${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2)).r
    }, ${getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2)).g}, ${
      getRGB(hslToHex(getHSL().h, getHSL().s, shiftL(getHSL().l).l2)).b
    }`,
  };

  return { color1, color2, color3, color4 };
}

function addColors(colorArray) {
  //color1
  document.querySelector(
    "#color1"
  ).style.backgroundColor = colorArray().color1.hex;
  document.querySelector(".hex1").textContent = colorArray().color1.hex;
  document.querySelector(".rgb1").textContent = colorArray().color1.rgb;
  document.querySelector(".hsl1").textContent = colorArray().color1.hsl;

  //color2
  document.querySelector(
    "#color2"
  ).style.backgroundColor = colorArray().color2.hex;
  document.querySelector(".hex2").textContent = colorArray().color2.hex;
  document.querySelector(".rgb2").textContent = colorArray().color2.rgb;
  document.querySelector(".hsl2").textContent = colorArray().color2.hsl;

  //color3
  document.querySelector(
    "#color3"
  ).style.backgroundColor = colorArray().color3.hex;
  document.querySelector(".hex3").textContent = colorArray().color3.hex;
  document.querySelector(".rgb3").textContent = colorArray().color3.rgb;
  document.querySelector(".hsl3").textContent = colorArray().color3.hsl;

  //color4
  document.querySelector(
    "#color4"
  ).style.backgroundColor = colorArray().color4.hex;
  document.querySelector(".hex4").textContent = colorArray().color4.hex;
  document.querySelector(".rgb4").textContent = colorArray().color4.rgb;
  document.querySelector(".hsl4").textContent = colorArray().color4.hsl;
}
