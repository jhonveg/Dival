import { useEffect, useState } from "react";
import TableCursos from "./TableCursos";
import { useCourses } from "../../Context/CoursesContext";

const CursosAdminPage = () => {
  const { getCourses, courses } = useCourses();

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="mt-20 ">
      <TableCursos cursos={courses} />
      
    </div>
  );
};

export default CursosAdminPage;
