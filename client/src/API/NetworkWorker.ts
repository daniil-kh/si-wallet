import * as Constants from '../Global';

export interface headersType {
  'Content-Type': string;
  Authorization: string;
}

export function timeout(time: number, promise: Promise<Response>) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout error!'));
    }, time);
    promise.then(resolve, reject);
  });
}

export async function postServerResponse(
  url: string,
  body: any,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
  customHeaders: null | headersType = null,
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'POST',
    includeHeaders,
    contentType,
    customHeaders,
  );

  return result;
}

export async function putServerResponse(
  url: string,
  body: any,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
  customHeaders: null | headersType = null,
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'PUT',
    includeHeaders,
    contentType,
    customHeaders,
  );

  return result;
}

export async function deleteServerResponse(
  url: string,
  body: any,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
  customHeaders: null | headersType = null,
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'DELETE',
    includeHeaders,
    contentType,
    customHeaders,
  );

  return result;
}

export async function getServerResponse(
  url: string,
  body: any,
  out = 30000,
  includeHeaders = true,
  contentType = 'application/json',
  customHeaders: null | headersType = null,
) {
  let result = await serverResponse(
    url,
    body,
    out,
    'GET',
    includeHeaders,
    contentType,
    customHeaders,
  );

  return result;
}

interface responseResult {
  data: any;
  statusCode: number;
}

async function serverResponse(
  url: string,
  body: any,
  out = 30000,
  type: string,
  includeHeaders: boolean,
  contentType: string,
  customHeaders: null | headersType = null,
) {
  let result: responseResult = {
    data: null,
    statusCode: 0,
  };

  let status = 0;

  await timeout(
    out,
    fetch(Constants.SERVER_ADDRESS + url, {
      method: type,
      headers: includeHeaders
        ? customHeaders
          ? customHeaders
          : {
              'Content-Type': contentType,
            }
        : {},
      body: type == 'POST' || type == 'PUT' ? body : null,
    }),
  )
    .then((res: any) => {
      status = res.status;
      let response = [];

      try {
        response = res.json();
      } finally {
      }

      return response;
    })
    .then((res: any) => {
      result.data = res;
      result.statusCode = status;

      //result.status = strings('Errors.Status' + status)
    })
    .catch((err) => {
      console.log('BRUH, THERE IS AN ERROR');
      throw new Error(err);
      //throw strings('Errors.timeout')
    });

  return result;
}
