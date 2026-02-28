import { observer, useExpressionScope, useField } from "@formily/react";
import { Avatar, Flex, Space, Tooltip, Typography } from "antd";
import { FC, useMemo, useRef } from "react";
import { SectionItem } from "../hooks/useFakeService";
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import useStyle from "../styles/sectionFace";
import classNames from "classnames";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

const UserItem: FC<UserItemProps> = ({ checked, mail, name, section, onCancel }) => {
  const tips = [section, name, mail];
  return (
    <li className={classNames({ checked })}>
      <Tooltip title={tips.filter(i => i).join("-")}>
        <Space direction="vertical" size={0} onClick={() => onCancel(!checked)}>
          <div className="face">
            <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${name}`} />
            <span className="choices choices-check">
              <CheckOutlined />
            </span>
            <span className="choices choices-close">
              <CloseOutlined />
            </span>
          </div>
          <Text className="tips-text" ellipsis={true}>
            {name}
          </Text>
        </Space>
      </Tooltip>
    </li>
  );
};

const RecentChoices: FC<RecentChoicesType> = ({ className, eventName, limit = 20 }) => {
  const recordRef = useRef<UserState[]>([]);
  const field = useField();

  const { $record = {} } = useExpressionScope();
  const { userMap = {} } = $record;
  const { data = [] } = field;

  const prefixCls = usePrefixCls("recent-choices");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const record = useMemo(() => {
    const update = [...(Array.isArray(data) ? data : [data])].reverse();
    const items = recordRef.current.reduce<Record<string, UserState>>((current, item) => {
      const { name, section } = item;
      return {
        ...current,
        [`${section}-${name}`]: { ...item, checked: false },
      };
    }, {});

    const newItems: UserState[] = [];
    update.forEach(row => {
      const newData = row || {};
      const { name = "", section = "" } = newData;

      const point = name && section ? `${section}-${name}` : "";
      if (point === "") return;

      const target = { ...newData, checked: true };
      if (items[point] !== undefined) {
        items[point] = target;
      } else {
        newItems.push(target);
      }
    });

    recordRef.current = newItems.concat(Object.values(items)).splice(0, limit);
    return recordRef.current;
  }, [data, limit]);

  return wrapSSR(
    <div className={classNames([hashId, prefixCls, className])}>
      {record.length === 0 ? (
        <Flex align="center" justify="center">
          <Text type="secondary">请先选择部门或员工</Text>
        </Flex>
      ) : (
        <ul>
          {record.map((user, i) => {
            const { name, section } = user;
            return (
              <UserItem
                {...user}
                key={`${name}-${i}`}
                mail={userMap[name]?.mail || ""}
                onCancel={checked => {
                  if (eventName)
                    field.form.notify(eventName, {
                      group: [name],
                      checked,
                      section,
                    });
                }}
              />
            );
          })}
        </ul>
      )}
    </div>,
  );
};

export default observer(RecentChoices);

interface RecentChoicesType {
  className?: string;
  eventName?: string;
  limit?: number;
}

interface UserItemProps extends UserState {
  onCancel: (checked: boolean) => void;
}

type UserState = SectionItem & { checked?: boolean };
