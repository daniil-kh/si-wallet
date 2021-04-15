import {errorServerResponse, Fonts} from './types/globalTypes';
import {CommonActions} from '@react-navigation/native';

export const fonts: Fonts = {
  BALSAMIQ_BOLD: 'BalsamiqSans-Bold',
  BALSAMIQ_BOLD_ITALIC: 'BalsamiqSans-BoldItalic',
  BALSAMIQ_ITALIC: 'BalsamiqSans-Italic',
  BALSAMIQ_REGULAR: 'BalsamiqSans-Regular',
};

let TOKEN: string = '';

export const SERVER_ADDRESS: string = 'http://48e203dff4ac.ngrok.io';
export const IMAGES_REPO: string = '/assets/';

export function getToken(): string {
  return TOKEN;
}

export function setToken(token: string): void {
  TOKEN = token;
}

export function errorHandler(
  result: errorServerResponse,
  errorSource = 'unknown',
) {
  const errorId = result.data.errors?.[0];
  let message = getErrorMessage(errorId, errorSource);
  throw new Error(message);
}

export function resetNavigationStack(navigation: any, routeName: string): void {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName}],
    }),
  );
}

export function getErrorMessage(
  errorId: string,
  source: string,
  details = true,
): string {
  let message: string;
  switch (errorId) {
    case 'email must be an email':
      message = 'Invalid email, try again';
      break;
    case 'User with this username already exists':
      message = 'User with this username already exists';
      break;
    case 'Wrong login or password':
      message = 'Wrong email or password';
      break;
    case 'You cannot withdraw more than you have, sorry)':
      message = 'Insufficient balance';
      break;
    case 'Request failed with status code 429':
      message = 'Too many attempts, try later';
      break;
    default:
      message = 'Something went wrong';
  }
  if (details) {
    return `An error occured in ${source} => ` + message;
  } else {
    return message;
  }
}
