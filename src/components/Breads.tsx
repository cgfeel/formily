import { Breadcrumb } from "antd";
import { FC, PropsWithChildren, useEffect } from "react";
import { Link, useLocation, useMatches } from "react-router";

const getRecord = <T extends string>(data: unknown, keyname: T): data is Record<T, unknown> =>
  data instanceof Object && keyname in data;

const getTitle = (data: unknown, fallback = "--") =>
  getRecord(data, "title") ? String(data.title ?? fallback) : fallback;

const Breads: FC<PropsWithChildren> = ({ children }) => {
  const matches = useMatches();
  const location = useLocation();

  useEffect(() => {
    function reset() {
      const { title } = document;
      document.title = title.split("-").pop()?.trim() ?? "--";
    }

    function push(name: string) {
      const { title } = document;
      document.title = `${name} - ${title}`;
    }

    const { handle, pathname } = matches.slice(-1)[0];
    const title = pathname !== "/" ? getTitle(handle, "") : "";
    if (title) {
      push(title);
    } else {
      reset();
    }
    return reset;
  }, [matches]);

  return (
    <>
      <Breadcrumb
        items={matches.map(({ handle, pathname }) => ({
          title:
            pathname === location.pathname ? (
              getTitle(handle)
            ) : (
              <Link to={{ pathname }}>{getTitle(handle)}</Link>
            ),
        }))}
      />
      {children}
    </>
  );
};

export default Breads;
