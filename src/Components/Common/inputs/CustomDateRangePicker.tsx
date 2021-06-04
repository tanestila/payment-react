import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

export const CustomDateRangePicker: React.FC<any> = ({ label, ...props }) => {
  return (
    <DateRangePicker
      initialSettings={{
        singleDatePicker: true,
        locale: {
          format: "DD.MM.YYYY",
        },
        // startDate: this.state.monthly_fee_date
        //   ? moment(this.state.monthly_fee_date).format("DD.MM.YYYY")
        //   : undefined,
      }}
    >
      <input type="text" className="form-control" />
    </DateRangePicker>
  );
};
