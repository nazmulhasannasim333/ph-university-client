import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["user-management"],
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user-management"],
    }),
    getStudentDetails: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
      providesTags: ["user-management"],
    }),
    updateStudentDetails: builder.mutation({
      query: ({ studentData, studentId }) => {
        return {
          url: `/students/${studentId}`,
          method: "PATCH",
          body: studentData,
        };
      },
      invalidatesTags: ["user-management"],
    }),
    changeUserStatus: builder.mutation({
      query: ({ userStatus, userId }) => {
        console.log({ userStatus, userId });
        return {
          url: `/users/change-status/${userId}`,
          method: "POST",
          body: userStatus,
        };
      },
      invalidatesTags: ["user-management"],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentDetailsQuery,
  useUpdateStudentDetailsMutation,
  useChangeUserStatusMutation,
} = userManagementApi;
