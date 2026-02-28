import { ISubmitProps } from "@formily/antd-v5";
import {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { FormContext } from "../Pannel";

const QueryWrapper = forwardRef<QueryWrapperInstance, PropsWithChildren<QueryWrapperProps>>(
  ({ children, service }, ref) => {
    const initRef = useRef(false);
    const { table } = useContext(FormContext);

    const handle = useCallback(
      async (value?: any) => {
        const data = await service(value);
        table.setValues(data);
      },
      [table, service],
    );

    useEffect(() => {
      if (!initRef.current) {
        initRef.current = true;
        handle();
      }
    }, [initRef, handle]);

    useImperativeHandle(ref, () => ({
      query: handle,
    }));
    return <>{children}</>;
  },
);

export interface QueryWrapperInstance {
  query: ISubmitProps["onSubmit"];
}

export interface QueryWrapperProps {
  service: (value?: any) => Promise<[]>;
}

export default QueryWrapper;
