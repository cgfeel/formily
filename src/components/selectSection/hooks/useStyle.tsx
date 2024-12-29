import { createStyles, css } from "antd-style";

export const usePanelStyles = createStyles(css`
    width: 86%;
`);

export const useScrollWapperStyle = createStyles(
    ({ css }, { maxWidth, minWidth, minHeight = 400, maxHeight = 400 }: ScrollWapperStyleProps) => css`
        max-height: ${maxHeight ? `${maxHeight}px` : "auto"};
        max-width: ${maxWidth ? `${maxWidth}px` : "auto"};
        min-height: ${minHeight ? `${minHeight}px` : "auto"};
        min-width: ${minWidth ? `${minWidth}px` : "auto"};
        overflow: auto;
    `,
);

export interface ScrollWapperStyleProps {
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
}
