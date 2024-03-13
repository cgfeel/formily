import { Form, FormGrid, IFormLayoutProps, ISubmitProps, Reset, Submit } from "@formily/antd-v5";
import { observer } from "@formily/react";
import { createStyles } from "antd-style";
import { FC, PropsWithChildren, useMemo } from "react";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";

const useCollapseGrid = (maxRows: number) => {
    const grid = useMemo(
        () =>
            FormGrid.createFormGrid({
                maxColumns: 4,
                maxWidth: 240,
                shouldVisible: (node, grid) => {
                    if (node.index === grid.childSize - 1 || grid.maxRows === Infinity) return true;
                    if (!node.shadowRow) return false;
                    return node.shadowRow < maxRows + 1;
                },
                maxRows,
            }),
        [maxRows],
    );

    const expanded = grid.maxRows === Infinity;
    const realRows = grid.shadowRows;
    const computeRows = grid.fullnessLastColumn ? grid.shadowRows - 1 : grid.shadowRows;

    const toggle = () => {
        if (grid.maxRows === Infinity) {
            grid.maxRows = maxRows;
        } else {
            grid.maxRows = Infinity;
        }
    };

    const takeType = (): ButtonGroupProps["type"] => {
        if (realRows < maxRows + 1) return "incomplete-wrap";
        if (computeRows > maxRows) return "collapsible";
        return "complete-wrap";
    };

    return { type: takeType(), expanded, grid, toggle };
};

const useStyles = createStyles({
    column: {
        display: "flex",
        justifyContent: "space-between",
    },
    group: {
        display: "flex",
        width: "100%",
    },
});

const QueryForm: FC<PropsWithChildren<QueryFormProps>> = observer(({ children, submit = {}, ...props }) => {
    const { grid, ...gridProps } = useCollapseGrid(1);
    const { styles } = useStyles();

    return (
        <Form {...props} feedbackLayout="terse" layout="vertical">
            <FormGrid grid={grid}>
                {children}
                <FormGrid.GridColumn gridSpan={-1} className={styles.column}>
                    <ButtonGroup {...gridProps} className={styles.group}>
                        <Submit {...submit}>查询</Submit>
                        <Reset>重置</Reset>
                    </ButtonGroup>
                </FormGrid.GridColumn>
            </FormGrid>
        </Form>
    );
});

export interface QueryFormProps extends IFormLayoutProps {
    submit?: ISubmitProps;
}

export default QueryForm;
