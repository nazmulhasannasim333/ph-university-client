import { Button, Table } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement";

const OfferedCourse = () => {
  const { data: offeredCourses, isFetching } =
    useGetAllOfferedCoursesQuery(undefined);
  console.log(offeredCourses);

  const tableData = offeredCourses?.data?.map(
    ({
      _id,
      academicDepartment,
      academicFaculty,
      academicSemester,
      course,
      faculty,
      maxCapacity,
    }) => ({
      key: _id,
      academicDepartment: academicDepartment?.name,
      academicFaculty: academicFaculty?.name,
      academicSemester: `${academicSemester?.name} ${academicSemester.year}`,
      course: course?.title,
      faculty: faculty.fullName,
      maxCapacity,
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
      title: "Max Capacity",
      key: "maxCapacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return <Button>Enrolled Course</Button>;
      },
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default OfferedCourse;
