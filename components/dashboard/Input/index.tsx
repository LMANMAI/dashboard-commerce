import React from "react";
import { Input } from "antd";
import { IPropsInputComponent } from "@types";

const InputComponent: React.FC<IPropsInputComponent> = ({
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
