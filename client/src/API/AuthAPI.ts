import * as NetworkWorker from './NetworkWorker';
import {serverResponse} from '../types/globalTypes';

export async function checkSession(token: string) {
  let resData: serverResponse;

  resData = await NetworkWorker.getServerResponse(
    `/api/v1/auth/validateToken`,
    null,
    5000,
    true,
    'application/json',
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  );

  console.log('RES DATA IS HERE', resData);
  return resData;
}

export async function login(email: string, password: string) {
  let resData: serverResponse;
  resData = await NetworkWorker.postServerResponse(
    `/api/v1/auth/login`,
    JSON.stringify({
      email: email,
      password: password,
    }),
  );
  console.log('RES DATA IS HERE', resData);
  return resData;
}

export async function signup(
  email: string,
  password: string,
  username: string,
  name: string,
  surname: string,
) {
  let resData: serverResponse;
  resData = await NetworkWorker.postServerResponse(
    `/api/v1/auth/signup`,
    JSON.stringify({
      email: email,
      password: password,
      username: username,
      name: name,
      surname: surname,
    }),
  );
  return resData;
}
