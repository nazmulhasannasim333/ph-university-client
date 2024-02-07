import { Alert, Button, Col, Divider, Row, Spin } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { FieldValues } from "react-hook-form";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../constants/user.const";
import {
  useGetAdminDetailsQuery,
  useUpdateAdminDetailsMutation,
} from "../../../redux/features/admin/userManagementApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { TAdmin, TResponse } from "../../../types";

const AdminUpdate = () => {
  const [updateAdmin] = useUpdateAdminDetailsMutation();
  const navigate = useNavigate();
  const { adminId } = useParams();
  const { data: facultyDetails, isLoading: facultyIsLoading } =
    useGetAdminDetailsQuery(adminId);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating admin...");
    const dateOfBirth = data.birthday;

    const adminFields = {
      ...data,
      dateOfBirth,
    };

    const adminData = {
      admin: adminFields,
    };

    try {
      const res = (await updateAdmin({
        adminData,
        adminId,
      })) as TResponse<TAdmin>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Admin updated", { id: toastId });
        navigate(`/admin/admin-data/${adminId}`);
      }
    } catch (error) {
      toast.error("Something went wrong...", { id: toastId });
    }
  };

  if (facultyIsLoading) {
    return (
      <Spin tip="Loading...">
        <Alert
          message="Wait......"
          description="Please wait for loading faculty details."
          type="success"
        />
      </Spin>
    );
  }

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDetails?.data}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="birthday" label="Date of birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default AdminUpdate;
