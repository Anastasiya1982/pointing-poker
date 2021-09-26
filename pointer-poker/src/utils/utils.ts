import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export const getFallbackText = (firstName: string, lastName: string) => {
  const first = firstName[0];
  let last;

  if (lastName === '') {
    last = firstName[firstName.length - 1];
  } else {
    last = lastName[0];
  }

  const res = first.toUpperCase() + last.toUpperCase();
  return res;
};
export const generateRandomId = () => {
  const id = Math.floor(Math.random() * 100);
  return id;
};

export const generateRandomNumber = () => {
  const n = Math.floor(Math.random() * 30) + 1;
  return n;
};

export const funcPercent = function toPercentages(arrTest: []) {
 let result = arrTest.reduce(function (acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  const arrValueFromObj = Object.values(result);
  const sumValues = (result) => Object.values(result).reduce((a, b) => a + b);
  let numberPercent = 0;
  let arrValueFromObjNEW = [];
  for (let i = 0; i < arrValueFromObj.length; i++) {
    numberPercent = arrValueFromObj[i] * (100 / sumValues(result))
    arrValueFromObjNEW.push(numberPercent)
  }
  return arrValueFromObjNEW.map(function (x: number) {
    return parseFloat((x).toFixed(2));
  });
};



export const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
export  const fileExtension = '.xlsx';

export const exportToCSV = (csvData: any, fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
