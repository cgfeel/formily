import { UploadOutlined } from "@ant-design/icons";
import { Upload, IUploadProps } from "@formily/antd-v5";
import { Button } from "antd";
import { FC } from "react";

const IDUpload: FC<IDUploadProps> = props => (
    <Upload
        {...props}
        action="https://run.mocky.io/v3/23f15833-e64e-4a7f-a54f-62cb1ee4c6db"
        headers={{
            authorization: "authorization-text",
        }}>
        <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
);

export interface IDUploadProps extends Omit<IUploadProps, "action" | "header"> {}

export default IDUpload;
