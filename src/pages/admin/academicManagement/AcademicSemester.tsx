import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is academic semester page</h1>
    </div>
  );
};

export default AcademicSemester;
