import React from "react";
import { useUser } from "utils/user";
import { IdSelect } from "./idSelect";

type IdSelectProps = React.ComponentProps<typeof IdSelect>;
export const UserSelect = (props: IdSelectProps) => {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props} />;
};
