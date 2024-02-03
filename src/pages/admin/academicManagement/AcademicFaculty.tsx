import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultyQuery(undefined);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Faculty",
      key: "name",
      dataIndex: "name",
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

export default AcademicFaculty;
