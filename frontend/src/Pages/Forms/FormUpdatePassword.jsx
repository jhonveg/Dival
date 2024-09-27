import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/authContext";
import { useState } from "react";

const CloseIcon = ({ onClick }) => (
  <button
    type="button"
    className="bg-red-700 rounded-md p-1 ml-2  text-gray-400 hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    onClick={onClick}
  >
    <span className="sr-only">Close menu</span>
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

const FormUpdatePassword = ({
  profile,
  profileErrors,
  setEditMode,
  editMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { updateUser, updateNewUserPassword } = useAuth();
  const [valor, setValor] = useState(null);

  const submitPassword = handleSubmit(async (data) => {
    try {
      const res = await updateNewUserPassword(data);
      console.log(res, "res desde profiletest");
      if (res.status === 201) {
        setEditMode(null);
        setValor(null);
        setValue("current_password", "");
        setValue("password", "");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      {profile ? (
        <div>
          {editMode === "password" ? (
            <form onSubmit={submitPassword}>
              <div>
                {profileErrors.map((error, i) => (
                  <div className="bg-gradient-to-r text-zinc-900  from-red-900  p-1   transition-all ease-in delay-150  text-center  rounded-md mb-2 mx-auto flex">
                    <div className="mx-auto  flex">
                      <div className=" mt-0.5 col-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <div className="ml-2 ">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {errors.password && (
                  <div className="bg-gradient-to-r text-zinc-900  from-red-900  p-1   transition-all ease-in delay-150  text-center  rounded-md mb-2 mx-auto flex">
                    <div className="mx-auto  flex">
                      <div className=" col-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                      <div className=" ">
                        <p>Debes ingresar una contraseña. </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className=" md:left-32 relative">
                  <CloseIcon
                    onClick={() => {
                      setEditMode(null);
                    }}
                  />
                </div>

                <input
                type="password"
                  placeholder="Contraseña actual de tu cuenta"
                  {...register("current_password", { required: true })}
                  autoFocus
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 mb-2"
                />

                <input
                  placeholder="Nueva contraseña"
                  {...register("password", { required: true })}
                  autoFocus
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                />

                <button
                  type="submit"
                  className="justify-center mt-2 bg-gradient-to-r from-green-600 shadow-xl  p-2 rounded-md "
                >
                  Cambiar contraseña
                </button>
               
              </div>
            </form>
          ) : (
            <>
              <p>Contraseña</p>

              <label className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                Nueva contraseña
              </label>
              <button
                color="info"
                onClick={() => setEditMode("password")}
                className="justify-center bg-gradient-to-r from-green-700 px-5 rounded-md mt-2"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormUpdatePassword;
