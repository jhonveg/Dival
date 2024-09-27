import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/authContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dival from "../../assets/dival logo.png";
import { FormSlidersImages } from "../../Components/Carrusel";
import Loading from "../../Components/Loading";
const FormLoginUsers = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 
  const {
    signin,
    Autenticado,
    errors: registerErrors, 
    loadingUpdateUserSchema,
  } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const { imagenes, imagenActual } = FormSlidersImages();
  const [sliderHover, setSliderHover] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isSubmit = handleSubmit(async (data) => {
    await signin(data);
    console.log(data);
  });

  useEffect(() => {
    if (Autenticado) {
      navigate("/profile");
    }
  }, [Autenticado]);
  return (
    <div
      className={`rounded-lg x max-w-auto justify-center mx-auto flex p-5    `}
    >
      {/* <div
        onMouseEnter={() => {
          !setSliderHover(true);
        }}
        onMouseLeave={() => {
          setSliderHover(false);
        }}
        className="flex justify-center items-center h-full relative  "
      >
        <img
          src={imagenes[imagenActual]}
          alt={`Imagen ${imagenActual + 1}`}
          className={`h-[655px] w-[350px] pt-20 hidden md:block opacity-${
            sliderHover
              ? "transition-all delay-200  100"
              : "80 brightness-[60%] "
          } slide-up fade-in   `}
          style={{ borderRadius: "5px" }}
        />

        <img
          src={dival}
          alt="Logo"
          className={`  transition-all delay-150 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fade-in  ${
            sliderHover
              ? "transition-all delay-200 opacity-0"
              : "transition-all delay-200 opacity-"
          } p-2  `}
          style={{ width: "100px", height: "100px" }}
        />
        <p
          className={`  bg-gradient-to-r from-cyan-400 rounded-md p-2   font-medium text-base  transition-all delay-150 absolute top-1/2 left-1/2 transform -translate-x-[80px] -translate-y-[-50px] fade-in   ${
            sliderHover
              ? "transition-all delay-200 opacity-0"
              : "transition-all delay-200 opacity-"
          } hidden md:block    tracking-widest select-none`}
        >
          ¡Donde los acordes se convierten en maestría!
        </p>
      </div> */}

      <Box
        className={`rounded-xl pb-14 pr-5  shadow-xl shadow-black  ${
          isVisible ? "fade-in" : ""
        } ${
          registerErrors.length > 0
            ? "bg-gradient-to-r from-red-600 to-red-800 transition "
            : " bg-zinc-900  pr-5  "
        } `}
        sx={{ mt: 10 }}
        flexDirection={"column"}
      >
        <Box className="flex items-center justify-center mb-4">
          {registerErrors.length > 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 mt-3 transition ease-in-out delay-150 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          ) : (
            <></>
          )}
        </Box>

        <p
          className={`transition-all ease-in delay-150  text-center font-bold mb-2 rounded-md  bg-gradient-to-r from-zinc-900  tracking-widest p-5 md:-mt-4 r -mt-4 text-2xl text-white ${
            registerErrors.length > 0
              ? " transition ease-in-out delay-150 bg-gradient-to-r from-red-900 text-sm text-white "
              : " scale transition ease-out delay-150 text-2xl justify-center mx-auto "
          }`}
        >
          {registerErrors.length < 1 && (
            <>
              <p className=" text-4xl text-center">Iniciar sesión</p>
              <p className="text-xs">Bienvenido de nuevo</p>
            </>
          )}

          {registerErrors.map((error, i) => (
            <div key={i} className=" ">
              {error}
              <div className=" justify-center"></div>
            </div>
          ))}
        </p>

        <form onSubmit={isSubmit} className="md:mt-20">
          {errors.email && (
            <p className="bg-gradient-to-r text-white from-red-700   transition-all ease-in delay-150  text-center font-bold mb-2">
              Ingresa un correo electrónico
            </p>
          )}
          {errors.password && (
            <p className="bg-gradient-to-r text-white  from-red-700  transition-all ease-in delay-150  text-center font-bold mb-2">
              Ingresa una contraseña
            </p>
          )}

          <div className="flex flex-wrap justify-center">
            <input
              className="mb-2 w-64 md:w-80 ml-8 text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid   border-slate-600  bg-white focus:bg-dival   text-black focus-visible:outline-0 hover:scale-105 py-3 px-4 pr-8 focus:placeholder-zinc-800"
              aria-label="Demo input"
              placeholder="&#x0040; Correo Electrónico"
              {...register("email", { required: true })}
            />

            <input
              className="mb-2 w-64 md:w-80 ml-8 text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid   border-slate-600  bg-white focus:bg-dival   text-black focus-visible:outline-0 hover:scale-105 py-3 px-4 pr-8 focus:placeholder-zinc-800"
              aria-label="Demo input"
              type="password"
              placeholder="&#x1F510; Contraseña"
              {...register("password", { required: true })}
            />
          </div>

          <div className="justify-center">
            <button
              type="submit"
              className="w-full p-5 ml-2  md:mb-3 shadow-sm shadow-black  bg-gradient-to-l from-zinc-900 text-white rounded-md hover:bg-dival focus:outline-none focus:ring   focus:border-blue-300 mt-10 py-"
            >
              {loadingUpdateUserSchema ? (
                <>
                  <p className="mx-auto justify-center ml-2">
                    Iniciando sesión...
                  </p>
                  <Loading />
                </>
              ) : (
                <p>Iniciar sesión</p>
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center pt-16 ">
          <Typography variant="" color={"white"}>
            ¿No tienes una cuenta?{" "}
            <Link
              className="text-dival shadow-sm shadow-black p-2 rounded-md"
              to={"/register"}
            >
              Cree una
            </Link>
            <img
              src={dival}
              alt="Logo"
              className={` mx-auto  transition-all delay-150 fade-in mt-2 shadow-sm shadow-dival rounded-md ${
                sliderHover
                  ? "transition-all delay-200 opacity-0"
                  : "transition-all delay-200 opacity-"
              } p-2  `}
              style={{ width: "40px", height: "40px" }}
            />
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default FormLoginUsers;
