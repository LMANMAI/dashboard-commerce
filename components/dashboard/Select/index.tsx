import React from "react";
import { Select } from "antd";
import { ISelect } from "@types";

const SelectComponent: React.FC<ISelect> = ({
  value,
  options,
  class_select,
  value_label,
  handleChange,
}) => {
  return (
    <Select
      defaultValue={value_label}
      value={value}
      onChange={(value) => handleChange(value, value_label)}
      className={class_select}
      options={options}
    />
  );
};

export default SelectComponent;
