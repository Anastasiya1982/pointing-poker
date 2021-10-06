import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export const getFallbackText = (firstName: string, lastName: string) => {
  const first = firstName[0];
  let last;

  if (lastName === '') {
    last = firstName[firstName.length - 1];
  } else {
    // eslint-disable-next-line prefer-destructuring
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

export function countResults(arr: any) {
  if (arr === null) return;
  const { length } = arr;
  const onePersonPercent = (1 / length) * 100;

  const withoutRound = arr.reduce((acc: { [x: string]: number }, item: string | number) => {
    if (acc[item]) {
      return { ...acc, [item]: acc[item] + onePersonPercent };
    }

    return { ...acc, [item]: onePersonPercent };
  }, {});
  // eslint-disable-next-line consistent-return
  return Object.entries(withoutRound).map(([key, value]) => [key, Math.round(<number>value)]);
}

export const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
export const fileExtension = '.xlsx';

export const exportToCSV = (csvData: any, fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getCurrentData = () => {
  const date = new Date();
  // const month = date.getMonth();
  const currentData = `${date.getFullYear()}-${months[date.getMonth()]}-${date.getDate()}`;
  return currentData;
};
