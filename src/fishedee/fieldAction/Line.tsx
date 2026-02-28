import { Divider } from "antd";
import { FC, PropsWithChildren } from "react";

const Line: FC<PropsWithChildren<LineProps>> = ({ children, title }) => (
  <>
    <div>
      {title}：{children}
    </div>
    <Divider />
  </>
);

export interface LineProps {
  title: string;
}

export default Line;
