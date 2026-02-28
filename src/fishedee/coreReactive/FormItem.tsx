import { FC, PropsWithChildren, useContext } from "react";
import { DecoratorProps, FieldContext } from "./Context";

const FormItem: FC<PropsWithChildren<DecoratorProps>> = ({ children, style: styleProps }) => {
  const field = useContext(FieldContext);

  const decoratorProps = field.decoratorProps;
  const style = Object.assign({ height: 20 }, decoratorProps.style, styleProps);

  return (
    <div>
      <div style={style}>{field.title}</div>
      {children}
      <div style={{ color: "red", fontSize: 12, height: style.height }}>
        {field.errors.join(",")}
      </div>
    </div>
  );
};

export default FormItem;
