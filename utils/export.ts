import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

var data = [{
  "name": "John",
  "city": "Seattle"
},
{
  "name": "Mike",
  "city": "Los Angeles"
},
{
  "name": "Zach",
  "city": "New York"
}
];

interface ExportDataInterface {
  time: string,
  value: number
}

export async function exportExcel(dataTrack: Array<number>, times: Array<string>) {
  let dataToExport: Array<ExportDataInterface> = []
  for (let index = 0; index < dataTrack.length; index++) {
    let temp: ExportDataInterface = { time: times[index], value: dataTrack[index] }
    dataToExport.push(temp)
  }
  var ws = XLSX.utils.json_to_sheet(dataToExport);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "tracking");
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });
  const uri = FileSystem.cacheDirectory + 'tracking.xlsx';
  console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });

  await Sharing.shareAsync(uri, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    dialogTitle: 'MyWater data',
    UTI: 'com.microsoft.excel.xlsx'
  });


}

