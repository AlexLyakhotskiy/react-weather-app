const tempColorData = {
  cold: '#00ffff',
  normal: '#fff700',
  hot: '#ff8c00',
};

export function getColorFromTemp(temp) {
  if (temp <= -10) {
    return tempColorData.cold;
  }
  if (temp > -10 && temp < 10) {
    const percent = getPercentFromTwoTemp(-10, temp);
    return mixTwoHexColor(tempColorData.cold, tempColorData.normal, percent);
  }
  if (temp === 10) {
    return tempColorData.normal;
  }
  if (temp > 10 && temp < 30) {
    const percent = getPercentFromTwoTemp(10, temp);
    return mixTwoHexColor(tempColorData.normal, tempColorData.hot, percent);
  }
  if (temp >= 30) {
    return tempColorData.hot;
  }
}

function mixTwoHexColor(firstColor, secondColor, percent) {
  const firstRgb = getRgbArrFromHexColor(firstColor);
  const secondRgb = getRgbArrFromHexColor(secondColor);

  const result = [];
  for (let i = 0; i < firstRgb.length; i++) {
    const mixedRgb = firstRgb[i] + (secondRgb[i] - firstRgb[i]) * percent;
    const mixedHex = Math.floor(mixedRgb).toString(16).padStart(2, '0');
    result.push(mixedHex);
  }

  return '#' + result.join('');
}

function getRgbArrFromHexColor(hex) {
  return hex
    .slice(1)
    .match(/.{1,2}/g)
    .map(e => parseInt(e, 16));
}

function getPercentFromTwoTemp(minTemp, currentTemp) {
  return (currentTemp - minTemp) / 20;
}
