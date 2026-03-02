import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import { FieldDataSource, isField } from "@formily/core";
import { RecordScope, observer, useField } from "@formily/react";
import { ConfigProvider, ConfigProviderProps } from "antd";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { SectionItem } from "../hooks/useFakeService";
import useStyle from "../styles/section";
import { isKey, objectKeys } from "../utils/fields";

const transformItem = (item: FieldDataSource[number]): SectionItem => {
  const record = { mail: "", name: "", section: "" };
  objectKeys(record).forEach(key => {
    record[key] = isKey(key, item) ? String(item[key]).trim() : "";
  });

  return record;
};

const UserMapRecord: FC<PropsWithChildren<UserMapRecordProps>> = ({
  children,
  className,
  index = 1,
  ...props
}) => {
  const field = useField();
  const record = !isField(field) ? [] : field.dataSource ?? [];

  const prefixCls = usePrefixCls("section");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const userMap = record.reduce<Record<string, SectionItem>>((current, item) => {
    const record = transformItem(item);
    const { name, section } = record;

    return name === "" || section === ""
      ? current
      : {
          ...current,
          [name]: record,
        };
  }, {});

  return wrapSSR(
    <RecordScope getRecord={() => ({ userMap })} getIndex={() => index}>
      <ConfigProvider {...props}>
        <div className={classNames([hashId, prefixCls, className])}>{children}</div>
      </ConfigProvider>
    </RecordScope>,
  );
};

export default observer(UserMapRecord);

interface UserMapRecordProps extends ConfigProviderProps {
  className?: string;
  index?: number;
}
