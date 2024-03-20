import { FORMATS } from "../SchemaField";
import { Properties } from ".";

export const schemaFormat = FORMATS.reduce<Properties>((current, key) => ({
    ...current,
    [`${key}_1`]: {
        required: true,
        title: `${key}格式_1`,
        type: 'string'
    },
}), {});