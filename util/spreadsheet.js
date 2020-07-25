import serviceAccount from '../config/mash-up-admin-dev-8deb0d42c2ef'; // https://www.notion.so/a23e6ac78eba4fd7a330b5db4c9e27c7
import {GoogleSpreadsheet} from 'google-spreadsheet';

async function getSheet(sheetId) {
  const doc = new GoogleSpreadsheet(sheetId);
  const authErr = await doc.useServiceAccountAuth(serviceAccount); // TODO(csh): 매번 인증이 아닌 한번만 인증할 수 있는 방법
  if (authErr) {
    throw Error('Google useServiceAccountAuth error');
  }
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

async function getHeaders(sheetId) {
  const sheet = await getSheet(sheetId);
  await sheet.loadHeaderRow();
  return sheet.headerValues;
}

export {
  getHeaders,
};
