import { Checkbox, FormGrid, FormItem } from "@formily/antd-v5";
import { createSchemaField } from "@formily/react";
import { Card, Input } from "antd";
import { FC, PropsWithChildren } from "react";
import SelectCollapse from "./com/SelectCollapse";
import ToolBar from "./com/ToolBar";
import UserCheckBox from "./com/UserCheckBox";
import ScrollWapper from "./com/ScrollWrapper";
import RecentRhoices from "./com/RecentChoices";
import UserMapRecord from "./com/UserMapRecord";
import TipTitle from "./com/TipTitle";
import SectionCollapse from "./components/SectionCollapse";
import { SectionDataType, SectionType } from "./event";
import InputTest from "./components/Input";
// import { SectionItem } from "./hooks/useFakeService";

const { GridColumn } = FormGrid;

const CardHeader: FC = ({ children }: PropsWithChildren) => (
  <div className="ant-card-topbar">
    <div className="ant-card-head-wrapper">
      <div className="ant-card-head-title">{children}</div>
    </div>
  </div>
);

const SchemaField = createSchemaField({
  components: {
    Card,
    CardHeader,
    Checkbox,
    FormGrid,
    FormItem,
    GridColumn,
    Input,
    RecentRhoices,
    ScrollWapper,
    SectionCollapse,
    SelectCollapse,
    TipTitle,
    ToolBar,
    UserCheckBox,
    UserMapRecord,
    InputTest,
  },
  scope: {
    filterSection: <T extends SectionDataType = SectionDataType>(record: T, search: string = ""): T => {
      const searchKey = search.toLowerCase();
      const { list } = record;
      const { items = [] } = list || {};

      return {
        ...record,
        search:
          searchKey === ""
            ? undefined
            : items.reduce<SectionType>(
                ({ expand, items }, newItem) => {
                  const name = newItem.name.toLowerCase();
                  const section = newItem.section.toLowerCase();
                  const pickName = name.indexOf(searchKey) > -1;

                  return {
                    expand: !pickName ? expand : expand.add(newItem.section),
                    items: pickName || section.indexOf(searchKey) > -1 ? items.concat(newItem) : items,
                  };
                },
                {
                  expand: new Set(),
                  items: [],
                },
              ),
        searchKey: search || undefined,
      };
    },
  },
});

export default SchemaField;
