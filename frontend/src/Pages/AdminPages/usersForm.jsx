import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import Loading from "../../Components/Loading";

const UsersFormPage = ({ userId, onClose, onRender }) => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { getUser, updateUserSchema, loadingUpdateUserSchema } = useAuth();
  const [formVisible, setFormVisible] = useState(true);
  const [editRol, setEditRol] = useState(false);
  const [userRol, setUserRol] = useState([]);

  useEffect(() => {
    async function loadUser(id) {
      if (id) {
        const user = await getUser(id);
        setValue("username", user.username);
        setValue("email", user.email);
        setUserRol(user.rol);
      }
    }

    loadUser(userId);
  }, [userId]);

  useEffect(() => {
    if (typeof onRender === "function") {
      onRender();
    }
  }, [userId, onClose, onRender]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data, "datos de la userschema");
    if (!data.rol) {
      data.rol = userRol;
    }
    const res = await updateUserSchema(userId, data);
    console.log(res, "res userschema");
    if (res && res.status) {
      setFormVisible(false);
      onClose();
    }
  });

  const onclickForm = () => {
    setFormVisible(false);
    onClose();
  };

  return (
    <div className="">
      {formVisible && (
        <div className="bg-dival rounded-lg p-6 mt-4 ">
          <button
            onClick={onclickForm}
            type="button"
            className="bg-gradient-to-l from-red-600  to-red-800 p-1 mb-2 ml-60 rounded-md"
          >
            <span className="sr-only">Cerrar formulario</span>
            <svg
              className="h-3 w-3"
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

          <h4
            className=" bg-gradient-to-r   from-zinc-900  to-zinc-800  p-2  tracking-widest text-center rounded-md text-white text-lg mt-4"
            variant="h6"
            gutterBottom
          >
            Modificar Usuario
          </h4>

          <form onSubmit={onSubmit} className="mt-4 ">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Nombre de Usuario
              </label>
              <input
                id="username"
                placeholder="Nuevo nombre de usuario"
                {...register("username")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  Nuevo nombre de usuario requerido
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="Nuevo correo electrónico"
                {...register("email")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  Correo electrónico es requerido
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white "
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Nueva contraseña"
                {...register("password")}
                className=" block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Contraseña es requerida
                </p>
              )}
            </div>

            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  setEditRol((prev) => !prev);
                }}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Modificar rol
              </button>

              {editRol && (
                <>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Rol de Usuario
                  </label>

                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    {...register("rol")}
                  >
                    <option value={"user"}>Usuario</option>
                    <option value={"admin"}>Administrador</option>
                  </select>
                  <div className="pointer-events-none  -mt- ml-24 mx-auto px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-l from-green-600 p-5 rounded-md shadow-lg mt-2"
            >
              
              {loadingUpdateUserSchema ? (
                 <>
                 Modificando usuario...
                <Loading/>
                 </>
              ) : (
                <p>Modificar</p>
              )}
              
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersFormPage;
