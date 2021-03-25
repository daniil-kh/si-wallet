export interface RequiredTextInputsProps {
  amount: string | undefined;
  address: string | undefined;
  setAddress: (address: string) => void;
  setAmount: (text: string) => void;
}

export interface SendButtonCotainerProps {
  isLoading: boolean;
  onPress: (
    token: string,
    amount: string,
    address: string,
    currency: any,
  ) => void;
}
