import { FC, Suspense, useEffect } from "react";
import { RouterKey, router } from "./list";
import BreadCrumb from "./components/BreadCrunb";

const RouterApp: FC<RouterAppProps> = ({ name }) => {
    const item = router[name];
    const Router = item.path;

    useEffect(() => {
        if (item) {
            document.title = item.name;
        }
    }, [item]);

    return (
        <BreadCrumb pathname={name}>
            <Suspense fallback={<>Loading...</>}>
                <Router />
            </Suspense>
        </BreadCrumb>
    );
};

export default function Router() {
    const { pathname } = window.location;
    const name = (pathname in router ? pathname : undefined) as RouterKey | undefined;

    return name === undefined ? <>This page is 404.</> : <RouterApp name={name} />;
}

interface RouterAppProps {
    name: RouterKey;
}
