import { UploadOutlined } from "@ant-design/icons";
import { Upload, IUploadProps, Input } from "@formily/antd-v5";
import styled from "@emotion/styled";
import { Button } from "antd";
import { FC } from "react";
import { useField } from "@formily/react";

// 放这里是因为单独一个文件太鸡肋，而这个又是每个模式都需要用的，就放在一起
const PopInput = styled(Input)`
    width: 300px;
`;

const objectEntries = <T extends object, K = keyof T>(obj: T) => Object.entries(obj) as Array<[K, T[keyof T]]>;

const transform = (data: Record<string, LocationItem | string> | undefined = {}): Option[] =>
    objectEntries(data).reduce((buf, [key, value]) => {
        if (typeof value === "string") {
            return [...buf, { label: value, value: key }];
        }

        const { code, name, cities, districts } = value;
        const _cities = transform(cities);
        const _districts = transform(districts);

        const children = _cities.length ? _cities : _districts.length ? _districts : void 0;
        return [
            ...buf,
            {
                label: name,
                value: code,
                children,
            },
        ];
    }, [] as Option[]);

const IDUpload: FC<IDUploadProps> = props => {
    const field = useField();
    return (
        <Upload
            {...props}
            action={`${process.env.REACT_APP_API_URL}/form/upload`}
            headers={{
                authorization: "authorization-text",
            }}>
            {field.editable && <Button icon={<UploadOutlined />}>上传复印件</Button>}
        </Upload>
    );
};

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

export interface IDUploadProps extends Omit<IUploadProps, "action" | "header"> {}

export interface LocationItem {
    code: string;
    name: string;
    cities?: Record<string, LocationItem>;
    districts?: Record<string, string>;
}

export { PopInput, transform };

export default IDUpload;
