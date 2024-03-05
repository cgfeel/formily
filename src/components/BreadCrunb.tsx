import { Breadcrumb } from "antd";
import { FC, PropsWithChildren } from "react";
import { RouterKey, router } from "../list";

const BreadCrumb: FC<PropsWithChildren<BreadCrumbProps>> = ({ children, pathname }) => {
    return (
        <>
            {pathname !== "/" && (
                <Breadcrumb
                    items={[
                        {
                            title: <a onClick={() => window.history.back()}>{router["/"].name}</a>,
                        },
                        {
                            title: router[pathname].name,
                        },
                    ]}
                />
            )}
            {children}
        </>
    );
};

interface BreadCrumbProps {
    pathname: RouterKey;
}

export default BreadCrumb;
