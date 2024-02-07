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
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import {
  useGetFacultyDetailsQuery,
  useUpdateFacultyDetailsMutation,
} from "../../../redux/features/admin/userManagementApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { TFaculty, TResponse } from "../../../types";

const FacultyUpdate = () => {
  const [updateFaculty] = useUpdateFacultyDetailsMutation();
  const navigate = useNavigate();
  const { facultyId } = useParams();
  const { data: facultyDetails, isLoading: facultyIsLoading } =
    useGetFacultyDetailsQuery(facultyId);
  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating faculty...");
    const academicDepartment = data.academicDepartment._id;
    const dateOfBirth = data.birthday;

    const facultyFields = {
      ...data,
      academicDepartment,
      dateOfBirth,
    };

    const facultyData = {
      faculty: facultyFields,
    };

    try {
      const res = (await updateFaculty({
        facultyData,
        facultyId,
      })) as TResponse<TFaculty>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Student updated", { id: toastId });
        navigate(`/admin/faculty-data/${facultyId}`);
      }
    } catch (error) {
      toast.success("Student created", { id: toastId });
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
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment._id"
                label="Admission Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default FacultyUpdate;
