import { Col, Row, Skeleton } from "antd";
import { FC } from "react";

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

const SelectSkeleton: FC<SelectSkeletonProps> = ({ length = 4 }) => (
  <Row gutter={[0, 12]}>
    {Array.from({ length }, (_, i) => (
      <SkeletonItem collapse={i === 0} key={`skeleton-${i}`} />
    ))}
  </Row>
);

export default SelectSkeleton;

interface SelectSkeletonProps {
  length?: number;
}
