import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAllAcademicDepartmentQuery(undefined);
  console.log(departmentData);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty?.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Department",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </>
  );
};

export default AcademicDepartment;
