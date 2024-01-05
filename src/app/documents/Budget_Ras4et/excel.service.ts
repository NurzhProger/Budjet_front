// // excel.service.ts
// import { Injectable } from '@angular/core';
// import * as ExcelJS from 'exceljs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ExcelService {
//   constructor() {}

//   async importExcel(file: File): Promise<any[][]> {
//     const workbook = new ExcelJS.Workbook();
//     const excelData: any[][] = [];

//     const buffer = await this.readFile(file);
//     const arrayBuffer = buffer as ArrayBuffer;

//     await workbook.xlsx.load(arrayBuffer);

//     const worksheet = workbook.getWorksheet(1);

//     worksheet.eachRow((row, rowNumber) => {
//       const rowData: any[] = [];
//       row.eachCell((cell, colNumber) => {
//         rowData.push(cell.value);
//       });
//       excelData.push(rowData);
//     });

//     return excelData;
//   }

//   private readFile(file: File): Promise<any> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         resolve(reader.result);
//       };

//       reader.onerror = (error) => {
//         reject(error);
//       };

//       reader.readAsArrayBuffer(file);
//     });
//   }
// }
