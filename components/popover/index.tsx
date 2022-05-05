import { Listbox } from "@headlessui/react";

interface SelectOption {
  disabled?: boolean;
}

interface Props<T> {
  className?: string;
  value: (T & SelectOption) | null;
  onChange: (value: T) => void;
  content: (value: T | null) => React.ReactNode;
  children?: React.ReactNode;
}

const Select = <T,>(props: Props<T>) => {
  return (
    <Listbox value={props.value} onChange={props.onChange}>
      <Listbox.Button className={props.className}>
        {props.content(props.value)}
      </Listbox.Button>
      <Listbox.Options className="absolute">{props.children}</Listbox.Options>
    </Listbox>
  );
};

interface OptionProps<T> {
  value: T & SelectOption;
  className?: string | ((active: boolean) => string);
  children: React.ReactNode;
  tabIndex?: number;
}

const Option = <T,>(props: OptionProps<T>) => (
  <Listbox.Option
    as="div"
    value={props.value}
    disabled={props.value.disabled}
    className={({ active }) =>
      typeof props.className === "string"
        ? props.className
        : props.className
        ? props.className(active)
        : ""
    }
    tabIndex={props.tabIndex}
  >
    {props.children}
  </Listbox.Option>
);

Select.Option = Option;
export default Select;
