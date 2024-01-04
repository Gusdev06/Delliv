import { ButtonStyle } from "./styles";

type Props = {
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
};

const SignIn = ({ type }: Props) => {
  return <ButtonStyle type={type}>Sign In</ButtonStyle>;
};

export default SignIn;
