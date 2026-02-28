import { observer } from "@formily/react";
import { toJS } from "@formily/reactive";
import { FC } from "react";

const Consumer: FC<ConsumerProps> = ({ values, filter }) => (
  <>
    <p>
      <strong>target:</strong>
    </p>
    <code className="consumer">
      <pre>{JSON.stringify(filter ? filter(toJS(values)) : toJS(values), null, 2)}</pre>
    </code>
  </>
);

type GroupItem = {
  path?: string;
  print?: string;
  read?: boolean;
  text?: string;
};

export interface ConsumerProps {
  values: FormData;
  filter?: (values: FormData) => object;
}

export type FormData = {
  group: GroupItem[];
};

export default observer(Consumer);
