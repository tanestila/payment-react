import { render } from "@testing-library/react";
import { Field } from "./Field";
// import { useField } from "formik"; // package will be auto mocked

const mockMeta = {
  touched: false,
  error: "",
  initialError: "",
  initialTouched: false,
  initialValue: "",
  value: "",
};
const mockField = {
  value: "",
  checked: false,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  multiple: undefined,
  name: "firstName",
};
const mockHelpers = {
  setValue: jest.fn(),
  setTouched: jest.fn(),
};

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useField: jest.fn(() => {
    return [mockField, mockMeta, mockHelpers];
  }),
}));

describe("Formik field", () => {
  it("render", () => {
    // const { getByText } = render(<Field label="test" />);
    // expect(getByText("test")).not.toBeNull();
  });
});
