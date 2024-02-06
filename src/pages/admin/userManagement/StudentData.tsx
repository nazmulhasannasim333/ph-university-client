import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";

import { Link } from "react-router-dom";
import {
  useChangeUserStatusMutation,
  useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagementApi";
import Swal from "sweetalert2";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [changeUserStatus] = useChangeUserStatusMutation();
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const handleBlockedUser = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, blocked it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // update status
        const userStatus = {
          status: "blocked",
        };
        await changeUserStatus({ userStatus, userId });
        Swal.fire({
          title: "Blocked!",
          text: "User has been blocked.",
          icon: "success",
        });
      }
    });
  };

  const handleUnblockedUser = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unblocked it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // update status
        const userStatus = {
          status: "in-progress",
        };
        await changeUserStatus({ userStatus, userId });
        Swal.fire({
          title: "Unblocked!",
          text: "User has been unlocked.",
          icon: "success",
        });
      }
    });
  };

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo, user }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      userId: user._id,
      status: user.status,
    })
  );

  // console.log({ tableData });

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "User Status",
      key: "status",
      render: (item) => {
        return (
          <Space>
            {item.status === "blocked" ? (
              <Button size="small" type="dashed" danger>
                Blocked
              </Button>
            ) : (
              <Button size="small" type="dashed">
                In-progress
              </Button>
            )}
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/update-student/${item.key}`}>
              <Button>Update</Button>
            </Link>
            {item?.status === "blocked" ? (
              <Button onClick={() => handleUnblockedUser(item.userId)}>
                Unblock
              </Button>
            ) : (
              <Button onClick={() => handleBlockedUser(item.userId)}>
                Block
              </Button>
            )}
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
