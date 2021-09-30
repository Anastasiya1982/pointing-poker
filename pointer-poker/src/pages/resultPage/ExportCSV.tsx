import React, { FC } from 'react';
import * as FileSaver from 'file-saver';
// @ts-ignore
import * as XLSX from 'xlsx';
import Button from '../../components/button/Button';

interface ExportScvType {
  csvData: any;
  filename: string;
}

export const ExportCSV: FC<ExportScvType> = ({ csvData, filename }) => {
  const onDowloadFile=((e:any) => exportToCSV(csvData, filename));
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return <Button onClick={onDowloadFile} TypeBtn='filled'  label="Download"/>;
};
