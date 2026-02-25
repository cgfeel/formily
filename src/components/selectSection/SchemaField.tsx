import { FormItem } from "@formily/antd-v5";
import { connect, createSchemaField, mapProps } from "@formily/react";
import { Card, Checkbox, Col, Input, Row, Select } from "antd";
import { FC, PropsWithChildren } from "react";
import SelectCollapse from "./com/SelectCollapse";
import ToolBar from "./com/ToolBar";
import UserCheckBox from "./com/UserCheckBox";
import ScrollWapper from "./com/ScrollWrapper";
import RecentRhoices from "./com/RecentChoices";
import UserMapRecord from "./com/UserMapRecord";
import TipTitle from "./com/TipTitle";
import SectionCollapse from "./components/SectionCollapse";
import { SectionType } from "./event";
import InputTest from "./components/Input";
import { LoadingOutlined } from "@ant-design/icons";
import { isField } from "@formily/core";

const CardHeader: FC = ({ children }: PropsWithChildren) => (
  <div className="ant-card-topbar">
    <div className="ant-card-head-wrapper">
      <div className="ant-card-head-title">{children}</div>
    </div>
  </div>
);

const CheckGroup = connect(
  Checkbox.Group,
  mapProps({
    dataSource: "options",
  }),
);

const InternalCheckbox = connect(
  Checkbox,
  mapProps({
    value: "checked",
    onInput: "onChange",
  }),
);

const SchemaField = createSchemaField({
  components: {
    Select: connect(
      Select,
      mapProps({ dataSource: "options", loading: true }, (props, field) =>
        !isField(field)
          ? props
          : {
              ...props,
              suffixIcon:
                field.loading || field.validating ? <LoadingOutlined /> : props.suffixIcon,
            },
      ),
    ),
    Card,
    CardHeader,
    Col,
    Checkbox: Object.assign(InternalCheckbox, {
      __ANT_CHECKBOX: true,
      Group: CheckGroup,
    }),
    FormItem,
    Input,
    RecentRhoices,
    Row,
    ScrollWapper,
    SectionCollapse,
    SelectCollapse, // redel
    TipTitle,
    ToolBar,
    UserCheckBox,
    UserMapRecord,
    InputTest,
  },
  scope: {
    expandSection: (list: SectionType, expandAction?: number) => {
      const expand = new Set<string>();
      if (expandAction === 1) {
        list.items.forEach(({ section }) => {
          if (!!section) expand.add(section);
        });
      }

      return expandAction === 1 || expandAction === 2 ? { ...list, expand } : list;
    },
    filterSection: (items: SectionType["items"], search?: string): SectionType | undefined => {
      const searchKey = search?.toLowerCase();
      return !searchKey
        ? undefined
        : items.reduce<SectionType>(
            (current, newItem) => {
              const name = newItem.name.toLowerCase();
              const section = newItem.section.toLowerCase();
              if (!name || !section) return current;

              const { expand, items } = current;
              const pickName = name.includes(searchKey);

              return {
                expand: !pickName ? expand : expand.add(newItem.section),
                items: pickName || section.includes(searchKey) ? items.concat(newItem) : items,
              };
            },
            {
              expand: new Set(),
              items: [],
            },
          );
    },
  },
});

export default SchemaField;
