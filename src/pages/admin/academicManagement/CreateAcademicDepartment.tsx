import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

const CreateAcademicDepartment = () => {
  const { data: facultyData, isLoading: fIsLoading } =
    useGetAllAcademicFacultyQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const academicFacultyOptions = facultyData?.data?.map((faculty) => ({
    value: faculty?._id,
    label: faculty?.name,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating department...");
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Department created", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput type="text" name="name" label="Name" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
            disabled={fIsLoading}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
