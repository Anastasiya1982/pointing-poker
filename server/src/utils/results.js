
const funcPercent = (arrTest)=> {
  const result = arrTest.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  const arrValueFromObj = Object.values(result);
  const sumValues = (result) => Object.values(result).reduce((a, b) => a + b);
  let numberPercent = 0;
  const arrValueFromObjNEW = [];
  for (let i = 0; i < arrValueFromObj.length; i++) {
    numberPercent = arrValueFromObj[i] * (100 / sumValues(result));
    arrValueFromObjNEW.push(numberPercent);
  }
  return arrValueFromObjNEW.map((x) => parseFloat((x).toFixed(2)));
};


module.exports={
   funcPercent
};
