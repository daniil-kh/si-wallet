import * as NetworkWorker from './NetworkWorker';
import {serverResponse} from '../types/globalTypes';

export async function editUserInfo(
  token: string,
  name: string,
  surname: string,
) {
  let result: serverResponse = [];
  result = await NetworkWorker.postServerResponse(
    `/api/v1/user/update`,
    JSON.stringify({
      name: name,
      surname: surname,
    }),
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return result;
}

export async function getUserInfo(token: string) {
  let result: serverResponse = [];
  result = await NetworkWorker.getServerResponse(
    `/api/v1/user`,
    null,
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return result;
}

export async function getWalletInfo(userId: string, token: string) {
  let result: serverResponse = [];
  result = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/allbalance`,
    JSON.stringify({
      token: token,
      user: userId,
    }),
  );
  return result;
}
