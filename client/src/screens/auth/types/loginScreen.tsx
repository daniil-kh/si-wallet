export interface InputFieldsProps {
  setLogin: (text: string) => void;
  login: string;
  setPassword: (text: string) => void;
  password: string;
}

export interface CheckBoxProps {
  setCheckActive: (value: boolean) => void;
  enabled: boolean;
}

export interface ButtonsContainerProps {
  isLoading: boolean;
  signInHandler: (login: string, password: string) => void;
  login: string;
  password: string;
  navigation: any;
}

export interface TouchableImageProps {
  source: {uri: string};
}
