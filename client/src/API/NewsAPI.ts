import * as NetworkWorker from './NetworkWorker';
import {serverResponse} from '../types/globalTypes';

export async function getNews(token: string, page: number) {
  let resData: serverResponse;
  resData = await NetworkWorker.getServerResponse(
    `/api/v1/blockchain/news/3`,
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
