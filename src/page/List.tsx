import { FC } from "react";
import { RouterKey, router } from "../list";

const list = Object.keys(router) as RouterKey[];

const List: FC = () => {
    return (
        <ul>
            {list.map(
                key =>
                    key !== "/" && (
                        <li key={key}>
                            <a href={key}>{router[key].name}</a>
                        </li>
                    ),
            )}
        </ul>
    );
};

export default List;
