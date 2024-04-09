import { onFieldValidateEnd, onFieldValidateFailed, onFieldValidateStart, onFieldValidateSuccess } from "@formily/core";

export const onValidateEffects = (name: string) => {
    onFieldValidateEnd(name, () => console.log('onFieldValidateEnd'));
    onFieldValidateFailed(name, () => console.log('onFieldValidateFailed'));
    onFieldValidateStart(name, () => console.log('onFieldValidateStart'));
    onFieldValidateSuccess(name, () => console.log('onFieldValidateSuccess'));
};