import { ExpressionScope, observer } from "@formily/react";
import { Avatar, Checkbox, CheckboxProps, Col, Row, Space, Typography } from "antd";
import classNames from "classnames";
import { FC, PropsWithChildren, useMemo } from "react";
import { useGroupScope } from "../hooks/useSelectCollapse";

const { Text } = Typography;

const InternalUser: FC<PropsWithChildren<InternalUserProps>> = ({
  children,
  group,
  records,
  values,
  selectHandle,
  section = "",
  ...props
}) => {
  const checked = useMemo(() => {
    if (!records?.length) {
      const size = group?.size ?? 0;
      return size > 0 && size === (values?.size ?? 0);
    } else {
      return Array.from(values ?? []).indexOf(records[0]) > -1;
    }
  }, [group, records, values]);

  const indeterminate = useMemo(() => {
    const size = values?.size ?? 0;
    return !records?.length && size > 0 && size < (group?.size ?? 0);
  }, [group, records, values]);

  return (
    <Checkbox
      {...props}
      checked={checked}
      indeterminate={indeterminate}
      onChange={({ target }) =>
        selectHandle?.({
          checked: target.checked,
          group: !records?.length ? Array.from(group ?? new Set()) : records,
          section,
        })
      }>
      {children}
    </Checkbox>
  );
};

const UserCheckBox: FC<PropsWithChildren<CheckboxProps>> = ({ children, ...props }) => {
  const { group, pattern, records, section, values, selectHandle } = useGroupScope();
  const $section = (records?.length ?? 0) === 0;

  return (
    <ExpressionScope value={{ $section }}>
      {pattern === "readPretty" ? (
        <>{children}</>
      ) : (
        <InternalUser
          {...props}
          group={group}
          records={records}
          section={section}
          values={values}
          selectHandle={selectHandle}>
          {children}
        </InternalUser>
      )}
    </ExpressionScope>
  );
};

const UserFace: FC = () => {
  const { records = [], userMap = {}, search } = useGroupScope();
  const name = records[0];

  return name === undefined ? null : (
    <Space>
      <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${name}`} style={{ backgroundColor: "#d0e7c5" }} />
      <Row gutter={[8, 8]}>
        <Col flex="none">
          <Text className={classNames({ searchChecked: !!search && name.toLowerCase().indexOf(search) > -1 })}>
            {name}
          </Text>
        </Col>
        <Col flex="auto">{userMap[name] && <Text type="secondary">({userMap[name].mail})</Text>}</Col>
      </Row>
    </Space>
  );
};

const UserPanel: FC = () => {
  const { group, search, section } = useGroupScope();
  return (
    <>
      <Text
        className={classNames({
          searchChecked: !!search && !!section && section.toLowerCase().indexOf(search) > -1,
        })}>
        {section}
      </Text>{" "}
      <Text type="secondary">({group?.size || 0})</Text>
    </>
  );
};

export { UserFace, UserPanel };

export default observer(UserCheckBox);

interface InternalUserProps
  extends CheckboxProps,
    Pick<ReturnType<typeof useGroupScope>, "group" | "records" | "section" | "selectHandle" | "values"> {}
