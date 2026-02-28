/**
 * 1. FormItem网格布局
 * 2. 居中，居右，居左布局
 * 3. 行内布局
 * 4. 吸底布局
 */
import { usePrefixCls } from "@formily/antd-v5/lib/__builtins__";
import useStyle from "@formily/antd-v5/lib/form-button-group/style";
import { ReactFC } from "@formily/react";
import { Space } from "antd";
import { SpaceProps } from "antd/lib/space";
import cls from "classnames";
import React, { useLayoutEffect, useRef, useState } from "react";
import StickyBox from "react-sticky-box";
import { BaseItem, IFormItemProps } from "../../formItem/form-item";

function getInheritedBackgroundColor(el: HTMLElement): string {
  // get default style for current browser
  const defaultStyle = getDefaultBackground(); // typically "rgba(0, 0, 0, 0)"

  // get computed color for el
  const backgroundColor = window.getComputedStyle(el).backgroundColor;

  // if we got a real value, return it
  if (backgroundColor !== defaultStyle) return backgroundColor;

  // if we've reached the top parent el without getting an explicit color, return default
  if (!el.parentElement) return defaultStyle;

  // otherwise, recurse and try again on parent element
  return getInheritedBackgroundColor(el.parentElement);
}

function getDefaultBackground() {
  // have to add to the document in order to use getComputedStyle
  let div = document.createElement("div");
  document.head.appendChild(div);
  let bg = window.getComputedStyle(div).backgroundColor;
  document.head.removeChild(div);
  return bg;
}

const InternalFormButtonGroup: ReactFC<IFormButtonGroupProps> = ({ align, gutter, ...props }) => {
  const prefixCls = usePrefixCls("formily-button-group");
  return (
    <Space
      {...props}
      size={gutter}
      className={cls(prefixCls, props.className)}
      style={{
        ...props.style,
        justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
        display: "flex",
      }}
    >
      {props.children}
    </Space>
  );
};

InternalFormButtonGroup.defaultProps = {
  align: "left",
};

const FormItem: ReactFC<IFormItemProps & { gutter?: number }> = ({ gutter, ...props }) => {
  return (
    <BaseItem
      {...props}
      label=" "
      style={{
        margin: 0,
        padding: 0,
        ...props.style,
        width: "100%",
      }}
      colon={false}
    >
      {typeof props.children === "string" ? (
        <Space size={gutter}>{props.children}</Space>
      ) : (
        props.children
      )}
    </BaseItem>
  );
};

const Sticky: ReactFC<React.PropsWithChildren<IStickyProps>> = ({ align, ...props }) => {
  const ref = useRef(null);
  const [color, setColor] = useState("transparent");
  const prefixCls = usePrefixCls("formily-button-group");
  const [wrapSSR, hashId] = useStyle(prefixCls);

  useLayoutEffect(() => {
    if (ref.current) {
      const computed = getInheritedBackgroundColor(ref.current);
      if (computed !== color) {
        setColor(computed);
      }
    }
  }, [color, ref, setColor]);
  return wrapSSR(
    <StickyBox
      {...props}
      className={cls(`${prefixCls}-sticky`, hashId, props.className)}
      style={{
        backgroundColor: color,
        ...props.style,
      }}
      bottom
    >
      <div
        ref={ref}
        className={`${prefixCls}-sticky-inner`}
        style={{
          ...props.style,
          justifyContent:
            align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
        }}
      >
        {props.children}
      </div>
    </StickyBox>,
  );
};

Sticky.defaultProps = {
  align: "left",
};

const FormButtonGroup = Object.assign(InternalFormButtonGroup, {
  FormItem,
  Sticky,
});

interface IStickyProps extends React.ComponentProps<typeof StickyBox> {
  align?: React.CSSProperties["textAlign"];
}

type IFormButtonGroupProps = Omit<SpaceProps, "align" | "size"> & {
  align?: React.CSSProperties["textAlign"];
  gutter?: number;
};

export { FormButtonGroup };

export default FormButtonGroup;
