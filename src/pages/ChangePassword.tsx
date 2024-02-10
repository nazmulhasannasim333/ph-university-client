import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";

const ChangePassword = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
