import { IRegistryRules } from "@formily/validator";

export const validateRules: IRegistryRules = {
    global_1(value) {
        if (!value) return '';
        return value !== '123' ? '错误了❎' : '';
    },
    global_2(value, rule) {
        if (!value) return '';
        return value !== '123' ? rule.message||'错误了❎' : '';
    },
    global_3(value) {
        if (!value) return '';
        return value === '123';
    },
    global_4(value) {
        if (!value) return '';
        if (value < 10) {
            return {
                type: 'error',
                message: '数值不能小于10',
            }
        } else if (value < 100) {
            return {
                type: 'warning',
                message: '数值在100以内',
            }
        } else if (value < 1000) {
            return {
                type: 'success',
                message: '数值大于100小于1000',
            };
        }
        return {
            type: 'error',
            message: '数值不能大于1000',
        }
    }
};