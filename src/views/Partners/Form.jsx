import { Formik, Form, Field } from "formik";

export default function SearchForm({ onSearch }) {
  return (
    <Formik
      initialValues={{ merchant_name: null, password: null }}
      validate={(values) => {}}
      onSubmit={(values, { setSubmitting }) => {
        let keys = Object.keys(values);
        let obj = {};
        keys.forEach((key) => {
          if (values[key]) obj[key] = values[key];
        });
        console.log(values);
        console.log(obj);
        onSearch(obj);
      }}
    >
      <Form>
        <label htmlFor="firstName">merchant_name</label>
        <Field type="text" name="merchant_name" />
        <label htmlFor="firstName">merchant_type</label>
        <Field type="text" name="merchant_type" />
        <label htmlFor="firstName">group_name</label>
        <Field type="text" name="group_name" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
