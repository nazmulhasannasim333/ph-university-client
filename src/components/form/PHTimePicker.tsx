import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimePicker = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TTimePicker) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              style={{ width: "100%" }}
              size="large"
              format="HH: mm"
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
