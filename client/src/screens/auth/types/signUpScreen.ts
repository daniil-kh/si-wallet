export interface userInfo {
  login: string;
  password: string;
  repeatedPassword: string;
  email: string;
  name: string;
  surname: string;
  isServiceTermsAccepted: boolean;
}

export interface screenState {
  userInfo: userInfo;
  isLoading: boolean;
  error: string | undefined;
}

export interface useTextInputType {
  value: string;
  onChangeText(text: string): void;
  label: string;
  inputStyle: any;
}

export interface stringAction {
  type: string;
  value: string | undefined;
  inputId: string;
}

export interface booleanAction {
  type: string;
  value: boolean;
  inputId: string;
}

export interface ButtonContainerType {
  isLoading: boolean;
  onPress(): void;
}

export interface CheckBoxProps {
  enabled: boolean;
  setCheckActive(type: string, inputId: string, value: boolean): void;
  text: string;
}

export interface UserInfoInputContainerProps {
  userInfo: userInfo;
  screenStateHandler(type: any, inputIdentifier: any, text: any): void;
}
