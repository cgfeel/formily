import styled from "@emotion/styled";
import { Card, Flex, FlexProps } from "antd";
import { createStyles, css } from "antd-style";
import { FC, PropsWithChildren, ReactNode } from "react";
import useStylish from "../../components/commonStylish";

const useStyles = createStyles(css`
  width: 600px;
`);

const CardBox = styled(Flex)`
  margin-bottom: 16px;
  width: 600px;
`;

const Tool: FC<PropsWithChildren<FlexProps>> = ({ children, ...props }) => (
  <CardBox {...props}>{children}</CardBox>
);

const Panel: FC<PropsWithChildren<PanelProps>> = ({ children, extra, footer, header }) => {
  const { styles } = useStyles();
  const stylish = useStylish();
  return (
    <div className={stylish.wraper}>
      {header}
      <div className={stylish.pannel}>
        {extra}
        <Card className={styles}>{children}</Card>
      </div>
      {footer}
    </div>
  );
};

export interface PanelProps {
  extra?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
}

export { Tool };

export default Panel;
