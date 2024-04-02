import { Field, GeneralField, isField } from "@formily/core";

export const asyncReact = async (field: GeneralField) => {
    // take 可以接受回调函数，也可以将取到的字段返回
    const select = field.query("select").take();
    if (!isField(select)) return;

    select.loading = true;
    field.display = await fetchVisible(select);

    select.loading = false;
}

export const asyncVisible = (field: Field, target?: Field) => {
    const { form } = field;
    field.loading = true;
    form.setFieldState(target||"input", async state => {
        state.display = await fetchVisible(field);
        field.loading = false;
    });
};

export const bgColor = (color: string) => {
    return "#" + (color + "0".repeat(6)).substring(0, 6);
};

export const colorReverse = (color: string) => {
    const oldColor = parseInt("0x" + color.replace(/#/g, ""), 16);
    const str = "000000" + (0xffffff - oldColor).toString(16);

    return "#" + str.substring(str.length - 6, str.length);
};

export const fetchVisible = async (field: Field) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/form/select-field/${field.value}`);
    const { visible }: VisibleType = await res.json();
    return visible;
}

export const getColor = ({ value }: Field) => {
    return String(value)
        .replaceAll(/[^a-zA-Z\d]*/g, "")
        .toUpperCase();
};

export const getColorValues = (field: Field) => {
    const str = getColor(field);
    const color = bgColor(str);
    return [str, color, colorReverse(color)];
};