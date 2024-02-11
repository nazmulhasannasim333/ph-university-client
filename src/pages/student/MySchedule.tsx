// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagementApi";
import { Table } from "antd";

const MySchedule = () => {
  const { data, isFetching } = useGetMyAllEnrolledCoursesQuery(undefined);
  console.log(data);

  const tableData = data?.data?.map(
    ({
      _id,
      academicDepartment,
      academicFaculty,
      academicSemester,
      course,
      faculty,
      student,
      offeredCourse,
      grade,
      gradePoints,
    }) => ({
      key: _id,
      academicDepartment: academicDepartment?.name,
      academicFaculty: academicFaculty?.name,
      academicSemester: `${academicSemester?.name} ${academicSemester.year}`,
      course: course?.title,
      faculty: faculty?.fullName,
      student: student?.fullName,
      section: offeredCourse.section,
      grade,
      gradePoints,
    })
  );

  const columns = [
    {
      title: "Academic Department",
      key: "academicDepartment",
      dataIndex: "academicDepartment",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Academic Semester",
      key: "academicSemester",
      dataIndex: "academicSemester",
    },
    {
      title: "Course",
      key: "course",
      dataIndex: "course",
    },
    {
      title: "Faculty",
      key: "faculty",
      dataIndex: "faculty",
    },
    {
      title: "Student",
      key: "student",
      dataIndex: "student",
    },
    {
      title: "Sections",
      key: "section",
      dataIndex: "section",
    },
    {
      title: "Grade Points",
      key: "gradePoints",
      dataIndex: "gradePoints",
    },
    {
      title: "Grade",
      key: "grade",
      dataIndex: "grade",
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default MySchedule;
