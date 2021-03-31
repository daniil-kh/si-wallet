import {serverResponse} from '../types/globalTypes';
import * as NetworkWorker from './NetworkWorker';

export async function sendTransaction(
  token: string,
  amount: number,
  withdrawAddress: string,
  network: string,
) {
  let resData: serverResponse;
  resData = await NetworkWorker.postServerResponse(
    `/api/v1/blockchain/withdraw`,
    JSON.stringify({
      amount: amount,
      withdrawAddress: withdrawAddress,
      network: network,
    }),
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return resData;
}

export async function getWalletInfo(token: string) {
  let resData: serverResponse;
  resData = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/allBalance`,
    null,
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return resData;
}

export async function getCoins(token: string) {
  let resData: serverResponse;
  resData = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/assets`,
    null,
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return resData;
}

export async function getCoinInfo(token: string, slug: string) {
  let resData;
  resData = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/assets/${slug}`,
    null,
    30000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );
  return resData;
}
