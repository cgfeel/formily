import { FC, useState } from "react";
import Panel, { PanelProps, Tool } from "./Panel";
import { Button, List, Tag } from "antd";

const objectKeys = <T extends object, K = keyof T>(obj: T) => Object.keys(obj) as Array<K>;
const checkIt = (group: WraperProps["group"], fn: WraperProps["list"][number]) =>
    [
        fn.name,
        objectKeys(group).reduce<Partial<Record<string, boolean>>>(
            (current, key) => ({
                ...current,
                [key]: fn(group[key]),
            }),
            {},
        ),
    ] as const;

const TagResult: FC<TagResultProps> = ({ name, success }) => <Tag color={success ? "success" : "error"}>{name}</Tag>;
const Wraper: FC<WraperProps> = ({ group, list, ...props }) => {
    const [[name, result], setKey] = useState(checkIt(group, list[0]));
    return (
        <Panel
            {...props}
            extra={
                <Tool wrap="wrap" gap="small">
                    {list.map(fn => (
                        <Button disabled={fn.name === name} key={fn.name} onClick={() => setKey(checkIt(group, fn))}>
                            {fn.name}
                        </Button>
                    ))}
                </Tool>
            }>
            <List
                size="large"
                dataSource={objectKeys(result)}
                renderItem={key => (
                    <List.Item>
                        <span>{key}</span>
                        <TagResult name={name} success={result[key] || false} />
                    </List.Item>
                )}
            />
        </Panel>
    );
};

interface TagResultProps {
    name: string;
    success: boolean;
}

export interface WraperProps extends Omit<PanelProps, "extra"> {
    group: Record<string, object>;
    list: Array<(tar: object) => boolean>;
}

export default Wraper;
