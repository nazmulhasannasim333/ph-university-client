import {
  TFaculty,
  TQueryParam,
  TResponseRedux,
  TStudent,
} from "../../../types";
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
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["user-management"],
    }),
    addFaculty: builder.mutation({
      query: (data) => {
        return {
          url: `/users/create-faculty`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user-management"],
    }),
    getFacultyDetails: builder.query({
      query: (facultyId) => ({
        url: `/faculties/${facultyId}`,
        method: "GET",
      }),
      providesTags: ["user-management"],
    }),
    updateFacultyDetails: builder.mutation({
      query: ({ facultyData, facultyId }) => {
        return {
          url: `/faculties/${facultyId}`,
          method: "PATCH",
          body: facultyData,
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
  useAddFacultyMutation,
  useGetAllFacultiesQuery,
  useGetFacultyDetailsQuery,
  useUpdateFacultyDetailsMutation,
} = userManagementApi;
