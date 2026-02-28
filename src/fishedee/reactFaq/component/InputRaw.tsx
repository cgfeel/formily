import { observer } from "@formily/react";
import { Input, InputProps } from "antd";
import { FC } from "react";

const InputRaw: FC<InputProps> = ({ onChange, onInput, ...props }) => (
  <Input
    {...{ placeholder: "我的存在只为了证明我被调用成功了" }}
    {...props}
    onChange={e => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      onChange && onChange(e);
      return false;
    }}
    onInput={e => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      onInput && onInput(e);
      return false;
    }}
  />
);

const InputWraper: FC<InputProps> = props => (
  <div
    onChange={e => {
      e.stopPropagation();
    }}
  >
    <Input {...props} />
  </div>
);

const WraperInput = observer(InputWraper);

export { WraperInput };

export default observer(InputRaw);
