import { ISchema } from "@formily/react";

export type Properties = Exclude<ISchema["properties"], string>;
