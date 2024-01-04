import { InputStyle } from "./styles";

type Props = {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ placeholder, type, value, onChange }: Props) => {
  return (
    <div>
      <InputStyle
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
