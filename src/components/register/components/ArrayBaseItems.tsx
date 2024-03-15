import { ArrayBase, FormItem } from "@formily/antd-v5";
import { FormConsumer } from "@formily/react";
import { FC, PropsWithChildren } from "react";

const ArrayBaseItems: FC<PropsWithChildren<ArrayBaseItemsProps>> = ({ children, className, index }) => (
    <div className={className}>
        {children}
        <FormConsumer>
            {form => (
                <>
                    {form.editable && (
                        <FormItem.BaseItem>
                            <ArrayBase.Remove index={index} title="删除联系人" />
                            <ArrayBase.MoveDown index={index} title="上移信息" />
                            <ArrayBase.MoveUp index={index} title="下移信息" />
                        </FormItem.BaseItem>
                    )}
                </>
            )}
        </FormConsumer>
    </div>
);

export interface ArrayBaseItemsProps {
    index: number;
    className?: string;
}

export default ArrayBaseItems;
