import { Input, Select } from "@formily/antd-v5";
import { createSchemaField, observer } from "@formily/react";
import styled from "@emotion/styled";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Card, EmptyProps, Empty as EmptyRaw } from "antd";
import FormItem from "../../../components/formItem/form-item";

const Header = styled.div`
    width: 600px;
`;

const Empty = observer<Omit<EmptyProps, "image">>(props => (
    <EmptyRaw {...props} image={EmptyRaw.PRESENTED_IMAGE_SIMPLE} />
));

const DescItem = observer<PropsWithChildren<DescItemProps>>(({ children, className, print, tips, title }) => (
    <div className={className}>
        <h3>{title}</h3>
        {tips && <div>{tips}</div>}
        {children && (
            <div>
                <strong>用例：</strong>
                {children}
            </div>
        )}
        {print && (
            <div>
                <strong>输出：</strong>
                {print}
            </div>
        )}
    </div>
));

const EmptyNone: FC = () => (
    <SchemaField.Void
        x-component="Empty"
        x-component-props={{ description: "请先设置路径" }}
        x-reactions={{
            dependencies: ["path"],
            when: "{{!!$deps[0] && validator($deps[0])}}",
            fulfill: {
                state: {
                    display: "none",
                },
            },
            otherwise: {
                state: {
                    display: "visible",
                },
            },
        }}
    />
);

const SchemaField = createSchemaField({
    components: {
        Card,
        DescItem,
        Empty,
        FormItem,
        Header,
        Input,
        Select,
    },
});

interface DescItemProps {
    title: ReactNode;
    className?: string;
    print?: ReactNode;
    tips?: ReactNode;
}

export { EmptyNone };

export default SchemaField;
