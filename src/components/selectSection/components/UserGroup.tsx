import { observer, RecordsScope } from "@formily/react";
import { Col, Row } from "antd";
import { FC, PropsWithChildren, useMemo } from "react";
import { useGroupScope } from "../hooks/useSelectCollapse";

const InternalGroup: FC<PropsWithChildren<InternalGroupProps>> = ({ children, schema = {} }) =>
  schema.remove === undefined ? (
    <>{children}</>
  ) : (
    <Row gutter={[0, 0]}>
      <Col flex="auto">{children}</Col>
      <Col flex="30px">{schema.remove}</Col>
    </Row>
  );

const UserGroup: FC = () => {
  const { group = new Set(), schema = {}, search = "" } = useGroupScope();
  const list = useMemo(
    () => Array.from(group).filter(name => search === "" || name.toLowerCase().indexOf(search) > -1),
    [group, search],
  );

  return (
    <Row gutter={[0, 16]}>
      {list.map((name, i) => (
        <Col key={`${name}-${i}`} span={24}>
          <RecordsScope getRecords={() => [name]}>
            <InternalGroup schema={schema}>{schema.checkbox === undefined ? name : schema.checkbox}</InternalGroup>
          </RecordsScope>
        </Col>
      ))}
    </Row>
  );
};

export default observer(UserGroup);

interface InternalGroupProps extends Pick<ReturnType<typeof useGroupScope>, "schema"> {}
