import { createForm, getValidateLocaleIOSCode } from "@formily/core";
import { List } from "antd";
import { FC } from "react";
import Panel from "../Panel";
import TabList from "../TabList";

const list = ["cn", "en", "ja", "tw", "us", "zh", "this-code-is-not-defined-ios-code"];

const GetValidateLocaleIOSCode: FC = () => {
  const form = createForm();
  return (
    <TabList>
      <Panel
        footer={
          <p>
            获取内置存在的 <code>ISO Code</code>
          </p>
        }
        form={form}
        header={
          <h2>
            <code>getValidateLocaleIOSCode</code>
          </h2>
        }
        subnone={true}
      >
        <List
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <span>
                {item}：{String(getValidateLocaleIOSCode(item))}
              </span>
            </List.Item>
          )}
        />
      </Panel>
    </TabList>
  );
};

export default GetValidateLocaleIOSCode;
