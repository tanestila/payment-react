import { Formik, Form } from "formik";
import { TextInput } from "../Common/SearchSelect/Form/TextInput";

type SearchFormProps = {
  onSearch: Function;
  columns: Array<any>;
};

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  columns,
}) => {
  const params = {};
  columns.forEach((c) => {
    params[c.dataIndex] = null;
  });
  return (
    <Formik
      initialValues={{ ...params }}
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
        {/* <label htmlFor="firstName">merchant_name</label>
        <Field type="text" name="merchant_name" /> */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};