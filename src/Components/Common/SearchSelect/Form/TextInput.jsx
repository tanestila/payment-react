import { Input } from "antd";
import Form from "antd/lib/form/Form";
import { useField } from "formik";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="ant-row ant-form-item">
      <div className="ant-col ant-form-item-label">
        <label>{label}</label>
      </div>
      <div className="ant-col ant-form-item-control">
        <Input className="form-control" {...field} {...props} />
      </div>
    </div>
  );
};
