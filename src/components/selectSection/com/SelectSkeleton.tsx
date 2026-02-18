import { Col, Row, Skeleton } from "antd";
import { createStyles, css } from "antd-style";
import { FC } from "react";

const useStyle = createStyles(css`
  & .ant-skeleton {
    width: 100%;
    & > .ant-skeleton-input {
      width: 100%;
    }
  }
`);

const SkeletonItem: FC<{ collapse?: boolean }> = ({ collapse = false }) =>
  collapse ? (
    <>
      <Col span={24}>
        <Skeleton.Input size="large" active />
      </Col>
      <Col span={24}>
        <Skeleton title={false} paragraph={{ rows: 1 }} active avatar />
      </Col>
      <Col span={24}>
        <Skeleton title={false} paragraph={{ rows: 1 }} active avatar />
      </Col>
    </>
  ) : (
    <Col span={24}>
      <Skeleton.Input size="large" active />
    </Col>
  );

const SelectSkeleton: FC = () => {
  const { styles } = useStyle();
  return (
    <Row className={styles} gutter={[0, 12]}>
      {Array.from({ length: 6 }, (_, i) => (
        <SkeletonItem collapse={i === 0} key={`skeleton-${i}`} />
      ))}
    </Row>
  );
};

export default SelectSkeleton;
