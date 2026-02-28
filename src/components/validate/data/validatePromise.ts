import { IRegistryRules } from "@formily/validator";

export const validateRules: IRegistryRules = {
  promise_1(value) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(!value || value === "123" ? "" : "错误❎");
      }, 1000);
    });
  },
};
