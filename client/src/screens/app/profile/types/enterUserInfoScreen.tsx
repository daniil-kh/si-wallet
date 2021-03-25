export interface SaveButtonContainerProps {
  onPress: (token: string, name: string, surname: string) => void;
  isLoading: boolean;
}
