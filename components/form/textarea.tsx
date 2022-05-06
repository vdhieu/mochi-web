import classNames from "classnames";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  value: any;
  changeValue: (value: any) => void;
}

const TextArea = (props: Props) => {
  const { value, changeValue, className, ...rest } = props;

  return (
    <textarea
      value={value}
      onChange={(e) => changeValue(e.target.value)}
      className={classNames(
        "bg-gray-50 w-full px-3 py-2 font-medium border rounded-md resize-none",
        className
      )}
      {...rest}
    />
  );
};

export default TextArea;
