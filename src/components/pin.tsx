import { Rate } from "antd";
import React from "react";

type RateSelectProps = React.ComponentProps<typeof Rate>;
type PinProps = {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
} & RateSelectProps;
export const Pin: React.FC<PinProps> = (props) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
    />
  );
};
