import React from "react";
import { Select } from "antd";
import { Raw } from "types";

// 如果某个组件的props没有暴露出来，可以使用下面这种写法
type SelectProps = React.ComponentProps<typeof Select>;

type IdSelectProps = {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
} & Omit<SelectProps, "value" | "onChange" | "options">;

const { Option } = Select;

export const IdSelect: React.FC<IdSelectProps> = (props) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Option value={0}>{defaultOptionName}</Option>
      ) : null}

      {options?.map((option) => {
        return (
          <Option value={option.id} key={option.id}>
            {option.name}
          </Option>
        );
      })}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
