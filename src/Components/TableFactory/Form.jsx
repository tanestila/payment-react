import { Card, Button } from "antd";
import { Formik, Form } from "formik";
import { TextInput } from "../Common/SearchSelect/Form/TextInput";

export const SearchForm = ({ onSearch, columns, search }) => {
  const params = {};
  columns.forEach((c) => {
    params[c.dataIndex] = null;
  });
  return (
    <Card>
      <Formik
        initialValues={{ ...search }}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {
          let keys = Object.keys(values);
          let obj = {};
          keys.forEach((key) => {
            if (values[key]) obj[key] = values[key];
          });

          onSearch(obj);
        }}
      >
        <Form className="ant-form ant-form-inline">
          {columns.map((c) => {
            if (c.search)
              return (
                <>
                  <TextInput label={c.title} name={c.dataIndex} />
                </>
              );
            else return null;
          })}

          <Button type="submit">Search</Button>
        </Form>
      </Formik>
    </Card>
  );
};
