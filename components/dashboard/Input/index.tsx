import React from "react";
import { Input } from "antd";

interface IProps {
  name: string;
  classType: string;
  type: string;
  placeholder: string;
  handleChangeFunction: any;
}
const InputComponent: React.FC<IProps> = ({
  name,
  classType,
  type,
  placeholder,
  handleChangeFunction,
}) => {
  return (
    <Input
      addonBefore={placeholder}
      className={classType}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={(e) => handleChangeFunction(e.target.value, name)}
    />
  );
};

export default InputComponent;
