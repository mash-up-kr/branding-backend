import serviceAccount from '../config/mash-up-admin-dev-8deb0d42c2ef'; // https://www.notion.so/a23e6ac78eba4fd7a330b5db4c9e27c7
import {GoogleSpreadsheet, GoogleSpreadsheetWorksheet} from 'google-spreadsheet';
import moment from 'moment';

function fillZero(number, width) {
  number = number + '';
  return number.length >= width ?
      number :
      new Array(width - number.length + 1).join('0') + number;
}

/**
 * @description Convert '2020. 7. 25 오후 11:10:54' to unix time stamp
 * @param {string} stringTimeStamp
 * @returns {number}
 */
function convertStringToUnixTimeStamp(stringTimeStamp) {
  if (!stringTimeStamp) {
    throw Error('Need string time stamp');
  }
  const splits = stringTimeStamp.split(' ');
  if (splits.length !== 5) {
    throw Error('Unknown time stamp format');
  }
  const year = splits[0].slice(0, -1);
  const month = fillZero(splits[1].slice(0, -1), 2);
  const day = fillZero(splits[2], 2);
  const isPM = splits[3] === '오후';
  const timeSplits = splits[4].split(':');
  const hours = fillZero((Number(timeSplits[0]) + (isPM ? 12 : 0)) + '', 2);
  const minutes = fillZero(timeSplits[1], 2);
  const seconds = fillZero(timeSplits[2], 2);
  const momentTime = moment(
      `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      'YYYY-MM-DD HH:mm"ss');
  return momentTime.valueOf();
}

/**
 * @param {string} sheetId
 * @returns {Promise<GoogleSpreadsheetWorksheet>}
 */
async function getSheet(sheetId) {
  const doc = new GoogleSpreadsheet(sheetId);
  const authErr = await doc.useServiceAccountAuth(serviceAccount); // TODO(sanghee): 매번 인증이 아닌 한번만 인증할 수 있는 방법
  if (authErr) {
    throw Error('Google useServiceAccountAuth error');
  }
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

/**
 * @param {string} sheetId
 * @returns {Promise<[string]>}
 */
async function getHeaderList(sheetId) {
  const sheet = await getSheet(sheetId);
  await sheet.loadHeaderRow();
  return sheet.headerValues;
}

/**
 * @param {string} sheetId
 * @param {number} [from=1]
 * @param {number} [to=-1]
 * @returns {Promise<[(number|string)]>}
 */
async function getDataList(sheetId, from = 1, to = -1) {
  const sheet = await getSheet(sheetId);
  const rowList = await sheet.getRows(
      {
        offset: 0,
        limit: 1000, // TODO(sanghee): from ~ to
      },
  );

  if (rowList.length === 0) {
    return [];
  }

  const headerLength = rowList[0]._sheet.headerValues.length;
  const dataList = [];

  // TODO(sanghee): Need to validate header 1, 2, 3, 4 (timestamp, email, name, birth)

  for (const row of rowList) {
    const data = Object.assign([], row._rawData);
    while (data.length < headerLength) {
      data.push('');
    }
    data[0] = convertStringToUnixTimeStamp(data[0]);
    dataList.push(data);
  }
  return dataList;
}

export {
  getHeaderList,
  getDataList,
};
