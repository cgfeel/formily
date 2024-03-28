import { GeneralField } from "@formily/core";
import { action } from "@formily/reactive";
import { fetchData } from "../server";

export const fetchAddress = (name: string) => (field: GeneralField) => {
    console.log(name);
    if (name === '') {
        if ('dataSource' in field) field.dataSource = [];
        return;
    }

    if ('loading' in field) field.loading = true;
    fetchData(name, action.bound!(data => {
        if ('dataSource' in field) field.dataSource = data;
        if ('loading' in field) field.loading = false;
    }))
}