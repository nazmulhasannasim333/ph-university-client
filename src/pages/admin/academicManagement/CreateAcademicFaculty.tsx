import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating faculty...");
    const facultyData = {
      name: data.name,
    };
    try {
      const res = (await addAcademicFaculty(
        facultyData
      )) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created", { id: toastId });
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
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput type="text" name="name" label="Name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
