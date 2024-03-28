import { GeneralField } from "@formily/core";
import { action } from "@formily/reactive";
import { LocationItem, transform } from "./components/IDUpload";

/**
 * 作为受控调用的作用域函数
 *  - 受控函数接受一个`Field`类型的参数，提供的方法和属性通过编辑器查看`.d.ts`
 *  - `action.bound`的用途是绑定上下文，但这里并没有用到上下文，即便传普通函数也是一样处理
 */
export const fetchAddress = (field: GeneralField) => {
    if ('loading' in field) field.loading = true;
    fetch("//unpkg.com/china-location/dist/location.json")
        .then(res => res.json())
        .then(
            action.bound!((data: Record<string, LocationItem>) => {
                if ('dataSource' in field) field.dataSource = transform(data);
                if ('loading' in field) field.loading = false;
            }),
        );
}