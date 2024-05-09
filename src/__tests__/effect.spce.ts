import { createForm, onFormInit, onFormMount, onFormUnmount } from "@formily/core";
import { attach } from "./shared";

test("onFormInit/OnFormMount/onFormUnmount", () => {
    const init = jest.fn();
    const mount = jest.fn();
    const unmount = jest.fn();

    const form = attach(createForm({
        effects() {
            onFormInit(init);
            onFormMount(mount);
            onFormUnmount(unmount);
        }
    }));

    expect(init).toHaveBeenCalledTimes(1);
    expect(mount).toHaveBeenCalledTimes(1);
    expect(unmount).not.toHaveBeenCalled();
    
    form.onUnmount();
});