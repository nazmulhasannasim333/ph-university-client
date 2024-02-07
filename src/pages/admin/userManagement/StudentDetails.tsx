import { Alert, Card, Col, Divider, Image, Row, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useGetStudentDetailsQuery } from "../../../redux/features/admin/userManagementApi";
import Title from "antd/es/typography/Title";
import moment from "moment";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data: studentDetails, isFetching } =
    useGetStudentDetailsQuery(studentId);
  const details = studentDetails?.data;

  if (isFetching) {
    return (
      <Spin tip="Loading...">
        <Alert
          message="Wait......"
          description="Please wait for loading student details."
          type="success"
        />
      </Spin>
    );
  }

  return (
    <>
      <Card style={{ width: "100%" }}>
        <Row gutter={20}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 4 }}>
            <Image
              width="100%"
              src={
                details.profileImg
                  ? details?.profileImg
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              }
            />
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 20 }}>
            <Title>{details?.fullName}</Title>
            <Title level={5}>
              Roll: {}
              <span style={{ color: "#736d6d" }}>{details?.id}</span>
            </Title>
            <Title level={5}>
              Gender: {}
              <span style={{ color: "#736d6d" }}>{details?.gender}</span>
            </Title>
            <Title level={5}>
              Blood Group: {}
              <span style={{ color: "#736d6d" }}>{details?.bloodGroup}</span>
            </Title>
            <Title level={5}>
              Date of Birth: {}
              <span style={{ color: "#736d6d" }}>
                {moment(details?.dateOfBirth).format("MMMM Do YYYY")}
              </span>
            </Title>
          </Col>
        </Row>
        <Divider />
        <Row gutter={20}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <Divider>Contact Info.</Divider>
            <Title level={5}>
              Email: {}
              <span style={{ color: "#878584" }}>{details?.email}</span>
            </Title>
            <Title level={5}>
              Contact No: {}
              <span style={{ color: "#878584" }}>{details?.contactNo}</span>
            </Title>
            <Title level={5}>
              Emergency Contact No: {}
              <span style={{ color: "#878584" }}>
                {details?.emergencyContactNo}
              </span>
            </Title>
            <Title level={5}>
              Present Address: {}
              <span style={{ color: "#878584" }}>
                {details?.presentAddress}
              </span>
            </Title>
            <Title level={5}>
              Permanent Address: {}
              <span style={{ color: "#878584" }}>
                {details?.permanentAddress}
              </span>
            </Title>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <Divider>Academic Info.</Divider>
            <Title level={5}>
              Admission Semester: {}
              <span style={{ color: "#736d6d" }}>
                {details?.admissionSemester?.name} -{" "}
                {details?.admissionSemester?.year}
              </span>
              <p style={{ color: "#968e8d", marginLeft: "40px" }}>
                Start - End:{" "}
                <span style={{ color: "#736d6d" }}>
                  {details?.admissionSemester?.startMonth}{" "}
                  {details?.admissionSemester?.year} -
                </span>
                <span style={{ color: "#736d6d" }}>
                  {" "}
                  {details?.admissionSemester?.endMonth}{" "}
                  {details?.admissionSemester?.year}
                </span>
              </p>
            </Title>
            <Title level={5}>
              Academic Department: {}
              <span style={{ color: "#736d6d" }}>
                {details?.academicDepartment?.name}
              </span>
            </Title>
            <Title level={5}>
              Academic Faculty: {}
              <span style={{ color: "#736d6d" }}>
                {details?.academicDepartment?.academicFaculty?.name}
              </span>
            </Title>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <Divider>Guardian</Divider>
            <Title level={5}>
              Father Name: {}
              <span style={{ color: "#878584" }}>
                {details?.guardian?.fatherName}
              </span>
            </Title>
            <Title level={5}>
              Father Occupation: {}
              <span style={{ color: "#878584" }}>
                {details?.guardian?.fatherOccupation}
              </span>
            </Title>
            <Title level={5}>
              Father ContactNo: {}
              <span style={{ color: "#878584" }}>
                {details?.guardian?.fatherContactNo}
              </span>
            </Title>
            <Title level={5}>
              Mother Name: {}
              <span style={{ color: "#878584" }}>
                {details?.guardian?.motherName}
              </span>
            </Title>
            <Title level={5}>
              Mother Occupation: {}
              <span style={{ color: "#878584" }}>
                {details?.guardian?.motherOccupation}
              </span>
            </Title>
            <Title level={5}>
              Mother ContactNo: {}
              <span style={{ color: "#878584" }}>
                {details?.guardian?.motherContactNo}
              </span>
            </Title>
          </Col>
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
            <Divider>Local Guardian</Divider>
            <Title level={5}>
              Name: {}
              <span style={{ color: "#878584" }}>
                {details?.localGuardian?.name}
              </span>
            </Title>
            <Title level={5}>
              Occupation: {}
              <span style={{ color: "#878584" }}>
                {details?.localGuardian?.occupation}
              </span>
            </Title>
            <Title level={5}>
              Contact No: {}
              <span style={{ color: "#878584" }}>
                {details?.localGuardian?.contactNo}
              </span>
            </Title>
            <Title level={5}>
              Address: {}
              <span style={{ color: "#878584" }}>
                {details?.localGuardian?.address}
              </span>
            </Title>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default StudentDetails;
