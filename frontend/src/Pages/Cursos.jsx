import Card from "../Components/cardCursos.jsx";
import { useCourses } from "../Context/CoursesContext";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading.jsx";

const CursosPage = () => {
  const { getCourses, courses, loadingCourses } = useCourses();

  useEffect(() => {
    getCourses();
  }, []);

  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleExpandClick = (courseId) => {
    setExpandedCardId((prevId) => (prevId === courseId ? null : courseId));
  };

  return (
    <div className="w-full overflow-x-hidden snap-y relative snap-mandatory overflow-y-auto h-screen pt-24 p-16">
  <div className="flex flex-wrap justify-center gap-10">
    {courses && courses.length === 0 && (
      <div className="text-center">
        {loadingCourses ? (
          <div>
            Cargando...
            <Loading />
          </div>
        ) : (
          <>
            No se encontraron cursos
            <div className="mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    )}

    {courses && courses.length > 0 && (
      courses.map((course) => (
        <Card
          key={course._id}
          course={course}
          expanded={expandedCardId === course._id}
          onExpandClick={() => handleExpandClick(course._id)}
          className="mb-5" // Agrega un espacio inferior entre las tarjetas
        />
      ))
    )}
  </div>
  
</div>

  
  );
};

export default CursosPage;
