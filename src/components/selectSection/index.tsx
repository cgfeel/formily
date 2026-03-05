import { Button } from "antd";
import { FC, useRef } from "react";
import Wraper from "./Wraper";
import BaseForm from "./form/BaseForm";
import ModalSection, { ModalSectionInstance } from "./form/ModalSection";

const SelectSectionExample: FC = () => {
  const modalRef = useRef<ModalSectionInstance>(null);
  return (
    <Wraper>
      <BaseForm
        append={
          <Button
            onClick={() => {
              modalRef.current?.open();
            }}
          >
            选择部门员工
          </Button>
        }
        onFormFinish={(name, { values, forms }) => {
          if (name === "sectionFrom") {
            console.log("a---modal", values, forms);
          }
        }}
      >
        <ModalSection name="sectionFrom" ref={modalRef} title="选择部门员工" />
      </BaseForm>
    </Wraper>
  );
};

export default SelectSectionExample;
