/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";

import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCoursesApi";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  console.log(facultyCoursesData);

  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <PHSelect options={courseOptions} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
