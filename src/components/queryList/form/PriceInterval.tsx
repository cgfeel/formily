import { Input, InputNumber, Space } from "antd";
import { FC, memo, useEffect, useState } from "react";

const PriceInterval: FC<PriceIntervalProps> = ({
    disabled,
    max: maxRaw,
    min: minRaw,
    onChange,
    value = { min: -1, max: -1 },
}) => {
    const [min, setMin] = useState<number>(-1);
    const [max, setMax] = useState<number>(-1);

    const sortData: (data: string | priceValueType) => priceValueType = data => {
        const list = (typeof data === "string" ? data.split("-") : [data.min, data.max]).map(num =>
            Math.max(-1, parseInt(num + "") || -1),
        );
        return {
            min: list[0] || -1,
            max: list[1] || -1,
        };
    };

    const triggerChange: (changeValue: { [key in keyof priceValueType]?: string | number }) => void = changeValue => {
        if (onChange !== void 0) {
            const data = Object.entries(changeValue).reduce<priceValueType>(
                (current, [key, value]) => {
                    const name = key === "min" ? key : "max";
                    return {
                        ...current,
                        [name]: parseInt(value + ""),
                    };
                },
                { min, max },
            );

            const info = sortData(data);
            onChange(info);
        }
    };

    const onBlur = () => {
        const list = [min, max];
        min > -1 &&
            max > -1 &&
            list[1] < list[0] &&
            triggerChange({
                min: list[1],
                max: list[0],
            });
    };

    const onNumberChange: (num: number, name: "min" | "max") => void = (num, name) => {
        ["min", "max"].indexOf(name) >= 0 &&
            triggerChange({
                [name]: num,
            });
    };

    useEffect(() => {
        const { min, max } = sortData(value);
        setMin(min);
        setMax(max);
    }, [value]);

    return (
        <Space.Compact style={{ display: "flex" }}>
            <InputNumber
                changeOnWheel={false}
                controls={false}
                placeholder="最低值"
                disabled={disabled}
                max={Math.max(0, maxRaw || 100)}
                min={Math.max(0, minRaw || 0)}
                value={min < 0 ? "" : min}
                onBlur={onBlur}
                onChange={num => onNumberChange(parseInt(num + "") || -1, "min")}
            />
            <Input
                placeholder="~"
                className="site-input-split"
                style={{ pointerEvents: "none", width: 30, borderRight: 0 }}
                disabled
            />
            <InputNumber
                changeOnWheel={false}
                controls={false}
                placeholder="最高值"
                disabled={disabled}
                max={Math.max(0, maxRaw || 100)}
                min={Math.max(0, minRaw || 0)}
                value={max < 0 ? "" : max}
                onBlur={onBlur}
                onChange={num => onNumberChange(parseInt(num + "") || -1, "max")}
            />
        </Space.Compact>
    );
};

type priceValueType = {
    min: number;
    max: number;
};

export interface PriceIntervalProps {
    disabled?: boolean;
    max?: number;
    min?: number;
    value?: priceValueType;
    onChange?: (value: priceValueType) => void;
}

export default memo(PriceInterval);
