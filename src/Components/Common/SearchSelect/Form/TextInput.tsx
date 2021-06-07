import { Input } from "antd";
import { useField } from "formik";
import { ReactNode } from "react";
import { Form } from "react-bootstrap";

type CustomInputProps = {
  label: string;
  children?: ReactNode;
  name: string;
  id: string;
  type: string;
};

export const TextInput = ({ label, ...props }: CustomInputProps) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="ant-row ant-form-item">
      <div className="ant-col ant-form-item-label">
        {/* <label>{label}</label>  */}
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
      </div>
      <div className="ant-col ant-form-item-control">
        <Input className="form-control" {...field} {...props} />
      </div>
    </div>
  );
};
