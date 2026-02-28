import styled from "@emotion/styled";
import { FormGrid, GridColumn } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { Card, Divider } from "antd";
import { FC } from "react";
import Pannel, { field } from "./Pannel";

const form = createForm();

const Cell = styled.div`
  align-items: center;
  background-color: #aaa;
  color: #fff;
  display: flex;
  height: 30px;
  padding: 0 10px;
`;

const GridCom = styled.div`
  width: 600px;
`;

const Grid: FC = () => (
  <Pannel form={form} header={<h2>原生 案例</h2>}>
    <Card>
      <GridCom>
        <p>maxColumns3 + minColumns2</p>
        <FormGrid maxColumns={3} minColumns={2} columnGap={4}>
          {field.map((i, num) => (
            <GridColumn gridSpan={num === 1 ? 3 : 1} key={`${num}${i}`}>
              <Cell>{num}</Cell>
            </GridColumn>
          ))}
        </FormGrid>
        <Divider />
        <p>maxColumns3</p>
        <FormGrid maxColumns={3} columnGap={4}>
          {field.map((i, num) => (
            <GridColumn gridSpan={num === 1 ? 2 : 1} key={`${num}${i}`}>
              <Cell>{num}</Cell>
            </GridColumn>
          ))}
        </FormGrid>
        <p>minColumns2</p>
        <FormGrid minColumns={2} columnGap={4}>
          {field.map((i, num) => (
            <GridColumn gridSpan={num === 1 ? 2 : 1} key={`${num}${i}`}>
              <Cell>{num}</Cell>
            </GridColumn>
          ))}
        </FormGrid>
        <p>Null</p>
        <FormGrid columnGap={4}>
          {field.map((i, num) => (
            <GridColumn gridSpan={num === 1 ? 2 : 1} key={`${num}${i}`}>
              <Cell>{num}</Cell>
            </GridColumn>
          ))}
        </FormGrid>
        <p>minWidth 150 +maxColumns 3</p>
        <FormGrid maxColumns={3} minWidth={150} columnGap={4}>
          {field.map((i, num) => (
            <GridColumn gridSpan={num === 1 ? 2 : 1} key={`${num}${i}`}>
              <Cell>{num}</Cell>
            </GridColumn>
          ))}
        </FormGrid>
        <p>maxWidth 120+minColumns 2</p>
        <FormGrid maxWidth={120} minColumns={2} columnGap={4}>
          {field.map((i, num) => (
            <GridColumn gridSpan={num === 1 ? 2 : 1} key={`${num}${i}`}>
              <Cell>{num}</Cell>
            </GridColumn>
          ))}
        </FormGrid>
        <p>maxWidth 120+gridSpan -1</p>
        <FormGrid maxWidth={120} columnGap={4}>
          <GridColumn gridSpan={2}>
            <Cell>1</Cell>
          </GridColumn>
          <GridColumn>
            <Cell>2</Cell>
          </GridColumn>
          <GridColumn gridSpan={-1}>
            <Cell>1</Cell>
          </GridColumn>
        </FormGrid>
      </GridCom>
    </Card>
  </Pannel>
);

export default Grid;
