import { Box, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/authContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dival from "../../assets/dival logo.png";
import { FormSlidersImages } from "../../Components/Carrusel";
import Loading from "../../Components/Loading";

const FormRegisterUsers = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    signup,
    Autenticado,
    errors: registerErrors,
    loadingUpdateUserSchema,
  } = useAuth();
  const { imagenes, imagenActual, image_dival } = FormSlidersImages();
  const [sliderHover, setSliderHover] = useState(false);

  console.log(sliderHover);

  console.log(registerErrors);

  const isSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (Autenticado) {
      navigate("/login");
    }
  }, [Autenticado]);

  return (
    <div className="flex flex-wrap  -ml-3 md:ml-20 md:pr-32">
      <div className={`rounded-xl    justify-center mx-auto flex p-5  `}>
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
            className={`h-[600px] w-[350px] pt-20 hidden md:block opacity-${
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
            ¡Descubre tu armonia interior con nosotros!
          </p>
        </div> */}

        <Box
          className={`bg-zinc-900 rounded-2xl shadow-xl shadow-black   ${
            registerErrors.length > 0
              ? "bg-gradient-to-r from-red-800 to-red-800"
              : ""
          }  pb-14 pr-6 ${isVisible ? "fade-in" : ""}`}
          sx={{ mt: 10 }}
          flexDirection="column"
          display={{ xs: "block" }}
        >
          <Box className="flex items-center justify-center mb-4">
            {registerErrors.length > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-16 h-16 mt-3 transition ease-in-out delay-150"
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
            className={`transition-all ease-in delay-150 md:-mt-4 -mt-4 text-center font-bold mb-2   bg-gradient-to-r from-zinc-900  tracking-widest p-5 text-2xl text-white ${
              registerErrors.length > 0
                ? " transition ease-in-out delay-150 bg-gradient-to-r from-red-900 text-sm text-white"
                : " scale transition ease-out delay-150 text-2xl"
            }`}
          >
            {registerErrors.length < 1 && (
              <>
                <p className="mx-auto text-center  text-4xl mb-2">
                  Registrarse
                </p>
                <p className="mx-auto text-center text-xs">
                  ¡Unete a nosotros!
                </p>
              </>
            )}

            {registerErrors &&
              registerErrors.map((error, i) => (
                <div key={i} className=" ">
                  {error}
                  <div className=" justify-center"></div>
                </div>
              ))}
          </p>

          <form onSubmit={isSubmit}  className="md:ml-16">
            {errors.username && (
              <p className="bg-gradient-to-r text-white from-red-900  p-1   transition-all ease-in delay-150  text-center font-bold mb-2 ">
                Ingresa un nombre de usuario{" "}
              </p>
            )}
            {errors.email && (
              <p className="bg-gradient-to-r text-white  from-red-900  p-1   transition-all ease-in delay-150  text-center font-bold mb-2 ">
                {" "}
                Ingresa un correo electrónico
              </p>
            )}
            {errors.password && (
              <p className="bg-gradient-to-r text-white  from-red-700  p-1  transition-all ease-in delay-150  text-center font-bold mb-2 ">
                Ingresa una contraseña
              </p>
            )}

            {errors.repeat_password && (
              <p className="bg-gradient-to-r text-white from-red-700  p-1  transition-all ease-in delay-150  text-center font-bold mb-2  ">
                Ingresa nuevamente la contraseña
              </p>
            )}

            <div className="flex  flex-wrap justify-center md:pr-20 md:mr-10">
              <input
                className="mb-2 w-64 md:w-80 ml-8 text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid   border-slate-600  bg-white focus:bg-dival   text-black focus-visible:outline-0 hover:scale-105 py-3 px-4 pr-8 focus:placeholder-zinc-800 flex"
                aria-label="Demo input"
                placeholder="&#x1F464; Nombre de usuario "
                {...register("username", { required: true })}
              />

              <input
                className="mb-2 w-64 md:w-80 ml-8 text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid   border-slate-600  bg-white focus:bg-dival   text-black focus-visible:outline-0 hover:scale-105 py-3 px-4 pr-8 focus:placeholder-zinc-800 flex"
                aria-label="Demo input"
                placeholder=" &#x0040; Correo Electrónico"
                {...register("email", { required: true })}
              />

              <input
                className="mb-2 w-64 md:w-80 ml-8 text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid   border-slate-600  bg-white focus:bg-dival   text-black focus-visible:outline-0 hover:scale-105 py-3 px-4 pr-8 focus:placeholder-zinc-800 flex"
                aria-label="Demo input"
                type="password"
                placeholder="&#x1F510; Contraseña "
                {...register("password", { required: true })}
              />

              <div>
                <input
                  className="mb-2 w-64 md:w-80 ml-8 text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid   border-slate-600  bg-white focus:bg-dival   text-black focus-visible:outline-0 hover:scale-105 py-3 px-4 pr-8 focus:placeholder-zinc-800 flex "
                  aria-label="Demo input"
                  type="password"
                  placeholder="&#x1F501; Ingresa la contraseña de nuevo"
                  {...register("repeat_password", { required: true })}
                />
              </div>
            </div>

            <div className="flex 'justify-center">
              <button
                type="submit"
                className="w-full shadow-sm shadow-black  ml-4 md:mb-3  md:-ml-10 bg-gradient-to-l from-zinc-900 text-white  rounded-md hover:bg-dival focus:outline-none focus:ring  p-5 focus:border-blue-300 mt-10 py-"
              >
                {!loadingUpdateUserSchema ? (
                  <p>Registrarse </p>
                ) : (
                  <>
                    Registrandose...
                    <Loading />
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-center  pt-16">
              <Typography variant="" color={"white"}>
                ¿Ya tienes cuenta?{" "}
                <Link
                  className="text-dival shadow-sm shadow-black p-2 rounded-md"
                  to={"/login"}
                >
                  Inicia sesión
                </Link>

                <img
                  src={dival}
                  alt="Logo"
                  className={` mx-auto  transition-all delay-150 fade-in shadow-sm shadow-dival rounded-md mt-5  ${
                    sliderHover
                      ? "transition-all delay-200 opacity-0"
                      : "transition-all delay-200 opacity-"
                  } p-2  `}
                  style={{ width: "40px", height: "40px" }}
                />

              </Typography>
            </div>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default FormRegisterUsers;
