import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { reject } from 'q';

const EXCEL_TYPE =
  'application/vnd.openxlmformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor() { }

  exportarExcel( json:any[], excelFileName:string):void{
    const worksheet:XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook:XLSX.WorkBook = {
      Sheets:{'data': worksheet},
      SheetNames:['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType:'xlsx', type:'array'});
    //llamando al metodo pasando el buffer y el filename
    this.saveExcel(excelBuffer, excelFileName);
    
  }
  private saveExcel(buffer:any, fileName:string):void{
    
    const data:Blob = new Blob([buffer],{type:EXCEL_TYPE});
    FileSaver.saveAs(data,fileName + '_export_'+ new Date().getTime() + '.xlsx'); 
  }
  exportarBd(valor:any):void{
    console.log(valor);
    let datos=JSON.stringify(valor)
    console.log(datos)
    //PARA DESCARGAR BASE DE DATOS EN BDATA.JSON
    let file = new File([datos],"bdata.json", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file,"bdata.json");
  }
}

