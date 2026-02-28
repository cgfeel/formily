import { FC } from "react";
import { RouterKey, disabled, router } from "../list";

const list = Object.keys(router) as RouterKey[];

const List: FC = () => {
  return (
    <ul>
      {list.map(
        key =>
          disabled.indexOf(key) < 0 && (
            <li key={key}>
              <a href={key}>{router[key].name}</a>
            </li>
          ),
      )}
    </ul>
  );
};

export default List;
