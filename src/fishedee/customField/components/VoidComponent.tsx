import { Divider } from "antd";
import { FC, PropsWithChildren, useContext } from "react";
import { FieldContext } from "../Context";

const VoidComponent: FC<PropsWithChildren> = ({ children }) => {
  const field = useContext(FieldContext);
  return (
    <div>
      <Divider orientation="left" plain>
        {field.title}
      </Divider>
      {children}
      <div style={{ marginBottom: 20 }}>{field.description}</div>
    </div>
  );
};

export default VoidComponent;
