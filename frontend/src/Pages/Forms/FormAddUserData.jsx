import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/authContext";
import { useStatesProfile } from "../../Context/useStateContext";

const FormAddUserData = ({ status, setStatus }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { addUserPersonalData, getProfile, profile, user } = useAuth();
  const [userPersonalData, setUserPersonalData] = useState([]);
  const {setItemProfile} = useStatesProfile()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfile();
        if (res && res.datos_personales && res.datos_personales.length > 0) {
          setUserPersonalData(res.datos_personales[0]);
          setValue("primer_nombre", res.datos_personales[0].primer_nombre);

          
          if (res.datos_personales[0].segundo_nombre.includes("no aplica")) {
            setValue("segundo_nombre", "");
          } else {
            setValue("segundo_nombre", res.datos_personales[0].segundo_nombre);
          }

         
         
          
          if(res.datos_personales[0].segundo_apellido.includes("no aplica")){
            setValue(
              "segundo_apellido",
              ""
            );
            
          }else {
            setValue(
              "segundo_apellido",
              res.datos_personales[0].segundo_apellido
            );
            
          }
          setValue("primer_apellido", res.datos_personales[0].primer_apellido);
          setValue("tipo_documento", res.datos_personales[0].tipo_documento);
          setValue(
            "numero_documento",
            res.datos_personales[0].numero_documento
          );
          setValue("sexo", res.datos_personales[0].sexo);
          setValue(
            "preferencia_contacto",
            res.datos_personales[0].preferencia_contacto
          );
          setValue("municipio", res.datos_personales[0].municipio);
          setValue("numero_telefono", res.datos_personales[0].numero_telefono);
         
          const fechaNacimiento = new Date ( res.datos_personales[0].fecha_nacimiento)
          const fechaFormateada = fechaNacimiento.toISOString().split('T')[0]

          setValue(
            "fecha_nacimiento",
            fechaFormateada
          );


        }


      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  // metodo para enviar los dastos del formulario
  const submitData = handleSubmit(async (data, e) => {
    // logica para tener la fecha actual formateada
    const fecha_actual = new Date();
    const fecha_actual_formateada = fecha_actual.toISOString().split("T")[0];

    data.segundo_nombre = data.segundo_nombre.trim();
    data.segundo_apellido = data.segundo_apellido.trim();
    // condicional para validar que la fecha que ingrese el usuario no sea mayor a la actual
    if (data.fecha_nacimiento > fecha_actual_formateada) {
      alert("La fecha de nacimiento no puede ser mayor a la fecha actual");
    } else {
      const res = await addUserPersonalData(data);
      if (res.status === 201) {
        setItemProfile("user-profile");
      }
    }
  });

  const containsNumber = (value) => /\d/.test(value);

  const validateText = (value) => {
    return !containsNumber(value);
  };

  return (
    <div>
      <form
        className="max-w-md mx-auto my-8 bg-white rounded-md p-6 shadow-md"
        onSubmit={submitData}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-first-name"
            >
              <div className="flex">
                <div>Primer nombre</div>
                <div className="text-red-700 ml-1">*</div>
              </div>
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Primer nombre"
              autoFocus={true}
              {...register("primer_nombre", { required: true })}
            />

            {errors.primer_nombre && (
              <p className="text-sm text-red-800">Este campo es requerido</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-second-name"
            >
              Segundo nombre (opcional)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-second-name"
              type="text"
              placeholder="Segundo nombre"
              {...register("segundo_nombre")}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-first-last-name"
            >
              <div className="flex">
                <div>Primer apellido</div>
                <div className="text-red-700 ml-1">*</div>
              </div>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-last-name"
              type="text"
              placeholder="Primer apellido"
              {...register("primer_apellido", { required: true })}
            />
            {errors.primer_apellido && (
              <p className="text-sm text-red-800">Este campo es requerido</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-second-last-name"
            >
              Segundo apellido (opcional)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-second-last-name"
              type="text"
              placeholder="Segundo apellido"
              {...register("segundo_apellido")}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-sexo"
            >
              <div className="flex">
                <div>Sexo</div>
                <div className="text-red-700 ml-1">*</div>
              </div>
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-sexo"
                {...register("sexo", { required: true })}
              >
                <option value={"femenino"}>Femenino</option>
                <option value={"masculino"}>Masculino</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {errors.sexo && (
              <p className="text-sm text-red-800">Este campo es requerido</p>
            )}
          </div>

          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-semibold -mt-4"
              htmlFor="grid-fecha-nacimiento"
            >
              <div className="flex">
                <div>Fecha de nacimiento</div>
                <div className="text-red-700">*</div>
              </div>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-fecha-nacimiento"
              type="date"
              placeholder="Fecha de nacimiento"
              {...register("fecha_nacimiento", { required: true })}
            />
            {errors.fecha_nacimiento && (
              <p className="text-sm text-red-800">Este campo es requerido</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-ciudad"
            >
              <div className="flex">
                <div>Municipio</div>
                <div className="text-red-700 ml-1">*</div>
              </div>{" "}
            </label>
            {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-ciudad" type="text" placeholder="Ciudad"  {...register("ciudad", { required: true,})} /> */}
            <select
              {...register("municipio", { required: true })}
              className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option></option>
              <option value="barbosa">Barbosa</option>
              <option value="girardota">Girardota</option>
              <option value="copacabana">Copacabana</option>
              <option value="bello">Bello</option>
              <option value="medellin">Medellin</option>
              <option value="envigado">Envigado</option>
              <option value="itagui">Itagui</option>
              <option value="la-estrella">La Estrella</option>
              <option value="caldas">Caldas</option>
            </select>

            {errors.municipio && (
              <p className="text-sm text-red-800">Este campo es requerido</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-telefono"
            >
              <div className="flex">
                <div>Número de teléfono</div>
                <div className="text-red-700">*</div>
              </div>{" "}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-telefono"
              type="number"
              placeholder="Número de teléfono"
              {...register("numero_telefono", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-tipo-documento"
            >
              <div className="flex">
                <div>Tipo de documento</div>
                <div className="text-red-700">*</div>
              </div>
            </label>

            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-sexo"
                {...register("tipo_documento", { required: true })}
              >
                <option value={"cc"}>Cedula Ciudadania</option>
                <option value={"ce"}>Cedula Extranjeria</option>
                <option value={"ti"}>Tarjeta idendtidad</option>
                <option value={"ps"}>Pasaporte</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              {errors.tipo_documento && (
                <p className="text-sm text-red-800">Este campo es requerido</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-numero-documento"
            >
              <div className="flex">
                <div>Numero de documento</div>
                <div className="text-red-700">*</div>
              </div>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-numero-documento"
              type="number"
              placeholder="Número de documento"
              {...register("numero_documento", { required: true })}
            />
            {errors.numero_documento && (
              <p className="text-sm text-red-800">Este campo es requerido</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="grid-sexo"
            >
              Preferencias de contacto
            </label>

            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-sexo"
                {...register("preferencia_contacto", { required: true })}
              >
                <option value={"phone"}>Telefono</option>
                <option value={"email"}>Correo electrónico</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddUserData;
