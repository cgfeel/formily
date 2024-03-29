import { usePrefixCls, createPortalProvider, createPortalRoot, loading } from "@formily/antd-v5/lib/__builtins__";
import { createForm, IFormProps, Form, onFormSubmitSuccess } from "@formily/core";
import { FormProvider, observer, ReactFC } from "@formily/react";
import { toJS } from "@formily/reactive";
import { isNum, isStr, isBool, isFn, applyMiddleware, IMiddleware } from "@formily/shared";
import { Drawer, DrawerProps } from "antd";
import {
    Fragment,
    KeyboardEvent,
    MouseEvent,
    ReactElement,
    ReactNode,
    isValidElement,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";

const isDrawerTitle = (props: any): props is DrawerTitle => {
    return isNum(props) || isStr(props) || isBool(props) || isValidElement(props);
};

const getDrawerProps = (props: any): IDrawerProps => {
    if (isDrawerTitle(props)) {
        return {
            title: props,
        };
    } else {
        return props;
    }
};

export function FormDrawer(title: IDrawerProps, id: string, renderer: FormDrawerRenderer): IFormDrawer;
export function FormDrawer(title: IDrawerProps, id: FormDrawerRenderer): IFormDrawer;
export function FormDrawer(title: DrawerTitle, id: string, renderer: FormDrawerRenderer): IFormDrawer;
export function FormDrawer(title: DrawerTitle, id: FormDrawerRenderer): IFormDrawer;
export function FormDrawer(title: any, id: any, renderer?: any): IFormDrawer {
    if (isFn(id) || isValidElement(id)) {
        renderer = id;
        id = "form-drawer";
    }
    const env: EnvType = {
        host: document.createElement("div"),
        openMiddlewares: [],
        form: null,
        promise: null,
    };
    const root = createPortalRoot(env.host, id);
    const props = getDrawerProps(title);
    const drawer = {
        width: "40%",
        ...props,
        onClose: (e: any) => {
            if (props?.onClose?.(e) !== false) {
                formDrawer.close();
            }
        },
        afterOpenChange: (visible: boolean) => {
            props?.afterOpenChange?.(visible);
            if (visible) return;
            root.unmount();
        },
    };
    const DrawerContent = observer(() => {
        return <Fragment>{isFn(renderer) ? renderer(env.form) : renderer}</Fragment>;
    });
    const renderDrawer = (visible = true) => {
        return (
            <Drawer {...drawer} open={visible && env.form !== null}>
                {env.form !== null && (
                    <FormProvider form={env.form}>
                        <DrawerContent />
                    </FormProvider>
                )}
            </Drawer>
        );
    };

    document.body.appendChild(env.host);
    const formDrawer = {
        forOpen: (middleware: IMiddleware<IFormProps>) => {
            if (isFn(middleware)) {
                env.openMiddlewares.push(middleware);
            }
            return formDrawer;
        },
        open: (props: IFormProps) => {
            if (env.promise) return env.promise;
            env.promise = new Promise(async (resolve, reject) => {
                try {
                    props = await loading(drawer.loadingText, () => applyMiddleware(props, env.openMiddlewares));
                    env.form =
                        env.form ||
                        createForm({
                            ...props,
                            effects(form) {
                                onFormSubmitSuccess(() => {
                                    resolve(toJS(form.values));
                                    formDrawer.close();
                                });
                                props?.effects?.(form);
                            },
                        });
                } catch (e) {
                    reject(e);
                }
                root.render(() => renderDrawer(false));
                setTimeout(() => {
                    root.render(() => renderDrawer(true));
                }, 16);
            });
            return env.promise;
        },
        close: () => {
            if (!env.host) return;
            root.render(() => renderDrawer(false));
        },
    };
    return formDrawer;
}

const DrawerExtra: ReactFC = props => {
    const ref = useRef<HTMLDivElement>(null);
    const [extra, setExtra] = useState<Element>();
    const extraRef = useRef<Element | null>();
    const prefixCls = usePrefixCls("drawer");
    useLayoutEffect(() => {
        const content = ref.current?.closest(`.${prefixCls}-content`)?.querySelector(`.${prefixCls}-header`);
        if (content) {
            if (!extraRef.current) {
                extraRef.current = content.querySelector(`.${prefixCls}-extra`);
                if (!extraRef.current) {
                    extraRef.current = document.createElement("div");
                    extraRef.current.classList.add(`${prefixCls}-extra`);
                    content.appendChild(extraRef.current);
                }
            }
            setExtra(extraRef.current);
        }
    }, [extraRef, prefixCls, props, ref, setExtra]);

    extraRef.current = extra;

    return (
        <div ref={ref} style={{ display: "none" }}>
            {extra && createPortal(props.children, extra)}
        </div>
    );
};

const DrawerFooter: ReactFC = props => {
    const ref = useRef<HTMLDivElement>(null);
    const [footer, setFooter] = useState<Element | null>(null);
    const footerRef = useRef<Element | null>(null);
    const prefixCls = usePrefixCls("drawer");
    useLayoutEffect(() => {
        const content = ref.current?.closest(`.${prefixCls}-content`);
        if (content) {
            if (!footerRef.current) {
                footerRef.current = content.querySelector(`.${prefixCls}-footer`);
                if (!footerRef.current) {
                    footerRef.current = document.createElement("div");
                    footerRef.current.classList.add(`${prefixCls}-footer`);
                    content.appendChild(footerRef.current);
                }
            }
            setFooter(footerRef.current);
        }
    }, [footerRef, prefixCls, props, ref, setFooter]);

    footerRef.current = footer;

    return (
        <div ref={ref} style={{ display: "none" }}>
            {footer !== null && createPortal(props.children, footer)}
        </div>
    );
};

FormDrawer.Extra = DrawerExtra;

FormDrawer.Footer = DrawerFooter;

FormDrawer.Portal = createPortalProvider("form-drawer");

type DrawerTitle = string | number | ReactElement;

type EnvType = {
    form: Form | null;
    host: HTMLElement;
    openMiddlewares: Array<IMiddleware<IFormProps>>;
    promise: Promise<any> | null;
};

type EventType = KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement | HTMLButtonElement>;

type FormDrawerRenderer = ReactElement | ((form: Form) => ReactElement);

export interface IFormDrawer {
    forOpen(middleware: IMiddleware<IFormProps>): IFormDrawer;
    open(props?: IFormProps): Promise<any>;
    close(): void;
}

export interface IDrawerProps extends DrawerProps {
    // onClose?: (e: EventType) => void | boolean;
    onClose?: (e: MouseEvent | KeyboardEvent | EventType) => void | boolean;
    loadingText?: ReactNode;
}

export default FormDrawer;
