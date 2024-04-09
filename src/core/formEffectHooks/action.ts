import { onFormSubmit, onFormSubmitEnd, onFormSubmitFailed, onFormSubmitStart, onFormSubmitSuccess, onFormSubmitValidateEnd, onFormSubmitValidateFailed, onFormSubmitValidateStart, onFormSubmitValidateSuccess, onFormValidateEnd, onFormValidateFailed, onFormValidateStart, onFormValidateSuccess } from "@formily/core";

export const onSubmitEffects = () => {
    onFormSubmit(() => console.log("onFormSubmit"));
    onFormSubmitStart(() => console.log("onFormSubmitStart"));
    onFormSubmitEnd(() => console.log("onFormSubmitEnd"));
    onFormSubmitSuccess(() => console.log("onFormSubmitSuccess"));
    onFormSubmitValidateStart(() => console.log("onFormSubmitValidateStart"));
    onFormSubmitValidateEnd(() => console.log("onFormSubmitValidateEnd"));
    onFormSubmitValidateSuccess(() => console.log('onFormSubmitValidateSuccess'));
    onFormSubmitFailed(() => console.log('onFormSubmitFailed'));
    onFormSubmitValidateFailed(() => console.log('onFormSubmitValidateFailed'));
};

export const onSubmitPromise = () => {
    console.log('onSubmitPromise');
    return new Promise(reslove => {
        setTimeout(() => reslove([]), 800);
    });
};

export const onSubmitPromiseFailed = () => {
    console.log('onSubmitPromise');
    return new Promise((_, reject) => {
        setTimeout(() => reject([]), 800);
    });
};

export const onValidateEffects = () => {
    onFormValidateEnd(() => console.log('onFormValidateEnd'));
    onFormValidateFailed(() => console.log('onFormValidateFailed'));
    onFormValidateStart(() => console.log('onFormValidateStart'));
    onFormValidateSuccess(() => console.log('onFormValidateSuccess'));
};