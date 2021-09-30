import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import exp from 'constants';

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

// export const funcPercent = function toPercentages(arrTest:Array<any>) {
//  let result = arrTest.reduce(function (acc, el) {
//     acc[el] = (acc[el] || 0) + 1;
//     return acc;
//   }, {});
//   const arrValueFromObj = Object.values(result);
//   const sumValues = (result:any) => Object.values(result).reduce((a, b) => a + b);
//   let numberPercent = 0;
//   let arrValueFromObjNEW = [];
//   for (let i = 0; i < arrValueFromObj.length; i++) {
//     numberPercent = arrValueFromObj[i] * (100 / sumValues(result))
//     arrValueFromObjNEW.push(numberPercent)
//   }
//   return arrValueFromObjNEW.map(function (x: number) {
//     return parseFloat((x).toFixed(2));
//   });
// };


export function countResults(arr:any) {
  if(arr===null) return ;
  const length = arr.length;
  const onePersonPercent = (1 / length * 100);

  const withoutRound = arr.reduce((acc: { [x: string]: number; }, item: string | number) => {
    if (acc[item]) {
      return { ...acc, [item]: acc[item] + onePersonPercent };
    }

    return { ...acc, [item]: onePersonPercent };
  }, {});

  return Object.entries(withoutRound).map(([key, value]) => ([key, Math.round(<number>value)]));
}



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

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export  const getCurrentData=()=>{
  const date = new Date();
 let month = date.getMonth();
 let currentData=(date.getFullYear() + '-' + months[date.getMonth()] + '-' + date.getDate());
 return currentData

}

