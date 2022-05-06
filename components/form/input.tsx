import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: any;
  changeValue: (value: any) => void;
}

const Input = (props: Props) => {
  const { value, changeValue, className, ...rest } = props;

  return (
    <input
      value={value}
      onChange={(e) => changeValue(e.target.value)}
      className={classNames(
        "w-full pl-3 font-medium bg-gray-50 leading-9 border rounded-md",
        className
      )}
      {...rest}
    />
  );
};

export default Input;
