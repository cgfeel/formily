import pathList from "@/routers/pathList";
import { FC } from "react";
import { Link } from "react-router";

const List: FC = () => {
  return (
    <ul>
      {pathList
        .filter(({ hidden }) => !hidden)
        .map(({ name, url }, key) => (
          <li key={`${url}:${key}`}>
            <Link to={{ pathname: url }}>{name}</Link>
          </li>
        ))}
    </ul>
  );
};

export default List;
