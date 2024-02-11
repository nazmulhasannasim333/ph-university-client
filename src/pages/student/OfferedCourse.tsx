/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import {
  useEnrolCourseMutation,
  useGetMyAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagementApi";
import { toast } from "sonner";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetMyAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrolCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const enrollData = {
      offeredCourse: id,
    };

    try {
      const res = (await enroll(enrollData)) as any;
      if (res.error) {
        toast.error(res.error.data.message, { duration: 2000 });
      } else {
        toast.success("Course enrolled successfully", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => (
        <Col
          key={`${item.courseTitle}`}
          span={24}
          style={{ border: "solid #d4d4d4 2px" }}
        >
          <div style={{ padding: "10px" }}>
            <h2>{item.courseTitle}</h2>
          </div>
          <div>
            {item.sections.map((section: any) => {
              return (
                <Row
                  key={section._id}
                  justify="space-between"
                  align="middle"
                  style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                >
                  <Col span={5}>Section: {section.section} </Col>
                  <Col span={5}>
                    days:{" "}
                    {section.days.map((day: any, index: number) => (
                      <span key={index}> {day} </span>
                    ))}
                  </Col>
                  <Col span={5}>Start Time: {section.startTime} </Col>
                  <Col span={5}>End Time: {section.endTime} </Col>
                  <Button onClick={() => handleEnroll(section._id)}>
                    Enroll
                  </Button>
                </Row>
              );
            })}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default OfferedCourse;
