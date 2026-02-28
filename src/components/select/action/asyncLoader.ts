import { GeneralField, isField } from "@formily/core";
import { action } from "@formily/reactive";
import { fetchData } from "../server";

export const fetchAddress = (name: string) => (field: GeneralField) => {
  // console.log(name);
  if (!isField(field)) return;
  if (name === "") {
    field.dataSource = [];
    return;
  }

  field.loading = true;
  fetchData(
    name,
    action.bound!(data => {
      field.dataSource = data;
      field.loading = false;
    }),
  );
};
