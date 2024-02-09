/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetAllAcademicDepartmentQuery,
  useGetSingleAcademicDepartmentQuery,
} from "../../../redux/features/admin/academicManagementApi";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement";
import PHInput from "../../../components/form/PHInput";
import { daysOptions } from "../../../constants/course.const";
import { TOfferedCourse, TResponse } from "../../../types";
import { toast } from "sonner";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";

type OptionType = {
  value: string;
  label: string;
};

const OfferCourse = () => {
  const [departmentId, setDepartmentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [academicFacultyOptions, setAcademicFacultyOptions] = useState<
    OptionType[]
  >([]);

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data: semesterRegistrationData } =
    useGetAllRegisteredSemestersQuery(undefined);
  const { data: academicDepartment } =
    useGetAllAcademicDepartmentQuery(undefined);
  const { data: academicDepartmentFaculty } =
    useGetSingleAcademicDepartmentQuery(departmentId, { skip: !departmentId });
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: courseFaculties } = useGetCourseFacultiesQuery(courseId, {
    skip: !courseId,
  });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    ({ _id, academicSemester }) => ({
      value: _id,
      label: `${academicSemester.name} ${academicSemester.year}`,
    })
  );

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const coursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const courseFacultiesOptions = courseFaculties?.data?.faculties?.map(
    (item: any) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  useEffect(() => {
    if (academicDepartmentFaculty) {
      const academicFaculty = academicDepartmentFaculty?.data?.academicFaculty;
      setAcademicFacultyOptions([
        { value: academicFaculty?._id, label: academicFaculty?.name },
      ]);
    } else {
      setAcademicFacultyOptions([]);
    }
  }, [academicDepartmentFaculty]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating offered course...");
    const offeredCourse = {
      ...data,
      startTime: moment(Number(data.startTime)).format("H:m"),
      endTime: moment(Number(data.endTime)).format("H:m"),
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
    };

    console.log({ offeredCourse, data });

    try {
      const res = (await addOfferedCourse(
        offeredCourse
      )) as TResponse<TOfferedCourse>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Offered course created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registration"
            options={semesterRegistrationOptions}
          />
          <PHSelectWithWatch
            onValueChange={setDepartmentId}
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />
          <PHSelect
            disabled={!departmentId}
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            name="course"
            label="Course"
            options={coursesOptions}
          />
          <PHSelect
            disabled={!courseId}
            name="faculty"
            label="Faculty"
            options={courseFacultiesOptions}
          />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHInput type="text" name="section" label="Section" />
          <PHSelect
            mode="multiple"
            name="days"
            label="Days"
            options={daysOptions}
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
