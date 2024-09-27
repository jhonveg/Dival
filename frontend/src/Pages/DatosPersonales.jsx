import FormAddUserData from "./Forms/FormAddUserData";
import FormAddCourseUserData from "./Forms/FormAddCourseUserData";

export const DatosPersonales = () => {
  return (
    <div className="pt-16">
      <FormAddUserData />
    </div>
  );
};

export const CursoDatosPersonales = () => {
  return (
    <div className="pt-16">
      <FormAddCourseUserData />
    </div>
  );
};
