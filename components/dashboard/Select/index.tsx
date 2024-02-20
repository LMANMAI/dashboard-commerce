import React from "react";
import { Select } from "antd";

interface ISelect {
  label: string;
  options: any;
  class_select: string;
  value_label: string;
  handleChange: Function;
}

const SelectComponent: React.FC<ISelect> = ({
  label,
  options,
  class_select,
  value_label,
  handleChange,
}) => {
  return (
    <Select
      defaultValue={label}
      onChange={(value) => handleChange(value, value_label)}
      className={class_select}
      options={options}
      style={{ width: 250 }}
    />
  );
};

export default SelectComponent;
