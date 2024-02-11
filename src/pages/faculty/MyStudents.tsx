/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";

import { Button, Modal, Table } from "antd";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCoursesApi";
import { toast } from "sonner";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId },
    { name: "course", value: courseId },
  ]);

  console.log(facultyCoursesData);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }: any) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }: any) => {
  console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data: any) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    try {
      const res = (await addMark(studentMark)) as any;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { duration: 2000 });
      } else {
        toast.success("Marks updated", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Update Marks</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Midterm" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
