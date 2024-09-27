import { useAuth } from "../Context/authContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import icon_placeholder from "../assets/icon_placeholder.png";
import FormUsername from "./FormUsername.jsx";
import FormEmail from "./Forms/FormEmail";
import Loading from "../Components/Loading.jsx";
import AdminPanel from "./AdminPages/AdminPanel.jsx";
import FormUpdatePassword from "./Forms/FormUpdatePassword.jsx";
import FormAddUserData from "./Forms/FormAddUserData.jsx";
import {
  TusPreInscripciones,
  Tusinscripciones,
} from "../Components/TusPreinscripciones.jsx";
import { useStatesProfile } from "../Context/useStateContext.jsx";

const ProfilePagetest = () => {
  const {
    profile,
    getProfile,
    errors: profileErrors,
    createAvatar,
    avatarStatus,
    updateAvatar,
    loadingAvatar,
  } = useAuth();
  const { handleSubmit, register, setValue } = useForm();
  const [editMode, setEditMode] = useState(null);
  const [updateUsername, setUpdateUsername] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState("user-profile");
  const [inputValue, setInputValue] = useState(null);
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [desactivarBoton, setDesactivarBoton] = useState(true);
  const { itemProfile, setItemProfile } = useStatesProfile();

  useEffect(() => {
    getProfile();
  }, []);

  const ProfileSgv = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    );
  };

  const handleFileChange = (e) => {
    setSelectedImageFile(e.target.files[0]);
  };

  const submitAvatar = handleSubmit(async () => {
    const formData = new FormData();
    formData.append("image", selectedImageFile);

    try {
      const res = await createAvatar(formData);
      setDesactivarBoton(false);
    } catch (error) {
      console.error(error);
    }
  });

  const submitUpdateAvatar = handleSubmit(async () => {
    const formData = new FormData();
    formData.append("image", selectedImageFile);

    try {
      const res = await updateAvatar(formData);
      setDesactivarBoton(false);

      return res;
    } catch (error) {
      console.error(error);
    }
  });

  const setEmailAndCloseUsername = () => {
    setEditMode("email");
  };

  const setUsernameAndCloseEmail = () => {
    setEditMode("username");
  };

  const setAvatarAndCloseEmailAndUsername = () => {
    setEditMode("avatar");
  };


  useEffect(() => {
    if (avatarStatus === 200) {
      setValue("image", null);
      setEditMode(null);
    }
  }, [loadingAvatar]);

  return (
    <div className=" bg-opacity-80 w-full  mx-auto justify-center  ">
      <div className=" pt-20  w-full md:w-screen flex flex-col gap-5 px-3 md:px-20 lg:px-32 md:flex-row h-full pr-10 ">
        <aside className=" py-4 md:w-1/3 lg:w-1/4 md:block  ">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12 ">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Opciones</h2>

            <button
              onClick={() => {
                setItemProfile("user-profile");
              }}
              className={`flex items-center px-3 py-2.5 font-semibold w-auto  rounded-full ${
                itemProfile === "user-profile" &&
                "text-indigo-900 border border-indigo-900 p-2 hover:text-indigo-900 hover:border transition-all delay-100"
              }`}
            >
              Perfil de Usuario
            </button>

            {profile &&
              profile.datos_personales &&
              profile.datos_personales.length < 1 && (
                <button
                  onClick={() => {
                    setItemProfile("user-data");
                  }}
                  className={`flex items-center font-semibold  rounded-full  ${
                    itemProfile === "user-data" &&
                    "text-indigo-900 border border-indigo-900  hover:text-indigo-900 hover:border transition-all  delay-150 p-2 "
                  }`}
                >
                  Agrega tus datos personales
                </button>
              )}

            {profile &&
              profile.datos_personales &&
              profile.datos_personales.length > 0 && (
                <button
                  onClick={() => {
                    setItemProfile("user-data");
                  }}
                  className={`flex items-center  font-semibold w-full  p-2  rounded-full ${
                    itemProfile === "user-data" &&
                    " text-indigo-900 border border-indigo-900  hover:text-indigo-900 hover:border transition-all delay-150 "
                  }`}
                >
                  Edita tus datos personales
                </button>
              )}

            {profile &&
              profile.pre_inscrito &&
              profile.pre_inscrito.length > 0 && (
                <>
                  <button
                    onClick={() => {
                      setItemProfile("pre-inscrito");
                    }}
                    className={`flex items-center  font-semibold  p-1  md:ml-1 ml-1 rounded-full ${
                      itemProfile === "pre-inscrito" &&
                      " text-indigo-900 border border-indigo-900  hover:text-indigo-900 hover:border transition-all delay-150 "
                    }`}
                  >
                    Tus pre inscripciones
                  </button>
                </>
              )}

            {profile && profile.inscrito && profile.inscrito.length > 0 && (
              <>
                <button
                  onClick={() => {
                    setItemProfile("inscrito");
                  }}
                  className={`flex items-center  font-semibold  p-1 md:ml-1 ml-1   rounded-full ${
                    itemProfile === "inscrito" &&
                    " text-indigo-900 border border-indigo-900  hover:text-indigo-900 hover:border transition-all delay-150 "
                  }`}
                >
                  Tus inscripciones
                </button>
              </>
            )}

            {profile.rol === "admin" && (
              <>
                <button
                  onClick={() => {
                    setItemProfile("admin");
                  }}
                  className={`flex items-center px-3 py-2.5 font-semibold rounded-full ${
                    itemProfile === "admin" &&
                    " text-indigo-900 border border-indigo-900 p-2 hover:text-indigo-900 hover:border transition-all delay-150"
                  }`}
                >
                  Administrar
                </button>
              </>
            )}
          </div>
        </aside>

        {itemProfile === "user-profile" && (
          <main className="w-[112%] min-h-screen py-1 md:w-screen w-full lg:w-[3/4] mx-auto md:max-w-2xl lg:max-w-3xl mt-2 rounded-md bg-opacity-80 bg-dival ">
            <div className="p-2 md:p-4 ">
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg ">
                <div className="flex flex-wrap">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl  ">
                    Mi perfil
                  </h2>
                  <div className="flex ml-2 mt-[3px]">
                    {" "}
                    <ProfileSgv />
                  </div>
                </div>
                <div className="grid max-w-2xl mx-auto mt-8 ">
                  <div
                    className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0  cursor-pointer "
                    onClick={setAvatarAndCloseEmailAndUsername}
                  >
                    {profile.avatar && profile.avatar.secure_url ? (
                      <img
                        src={profile.avatar.secure_url}
                        alt="avatar"
                        className="w-[130px] h-[130px] p-1 rounded-full border-r-4 border-l-4 border-t-4 border-b-4 border-zinc-700 mx-auto mb-2 "
                      />
                    ) : (
                      <img
                        src={icon_placeholder}
                        alt="avatar"
                        className="w-[130px] h-[160px] p-1 rounded-full border-r-4 border-l-4 border-t-4 border-b-4 border-zinc-700 mx-auto mb-2"
                        style={{ width: "150px" }}
                      />
                    )}

                    {profile.avatar &&
                    profile.avatar.secure_url &&
                    profile.avatar.secure_url.length > 1 ? (
                      <form
                        onSubmit={submitUpdateAvatar}
                        encType="multipart/form-data"
                      >
                        {editMode == "avatar" ? (
                          <>
                            <div className="-ml-4 md:-ml-16">
                              <input
                                className=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 md:ml-10 mr-1"
                                type="file"
                                {...register("image")}
                                onChange={handleFileChange}
                                disabled={avatarStatus === 200}
                              />
                            </div>
                            <div>
                              <button
                                className="bg-gradient-to-l from-green-600 p-5 rounded-md shadow-xl mt-2 ml-20   "
                                type="submit"
                                onClick={() => {
                                  setEditMode("avatar");
                                }}
                                disabled={avatarStatus === 200}
                              >
                                {loadingAvatar ? (
                                  <>
                                    <p className="font-bold">
                                      Actualizando, espere...
                                    </p>
                                    <Loading />
                                  </>
                                ) : (
                                  "Presione para actualizar"
                                )}
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="ml- md:-ml-32">
                            <button
                              className={` p-5 rounded-md  shadow-xl ${
                                avatarStatus === 200
                                  ? " bg-gradient-to-l from-gray-600 "
                                  : "bg-gradient-to-l from-cyan-400 "
                              } `}
                              onClick={setAvatarAndCloseEmailAndUsername}
                              disabled={!desactivarBoton}
                            >
                              {avatarStatus === 200 ? (
                                <>
                                  <div>
                                    Imagen actualizada
                                    <div className="mx-auto ml-14">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m4.5 12.75 6 6 9-13.5"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  Actualizar imagen
                                  <div className="justify-end">
                                    {" "}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                       strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5 "
                                    >
                                      <path
                                         strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                      />
                                    </svg>
                                  </div>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </form>
                    ) : (
                      <form
                        onSubmit={submitAvatar}
                        encType="multipart/form-data"
                      >
                        <div className="">
                          {editMode === "avatar" ? (
                            <div className="-ml-4 md:ml-5">
                              <input
                                type="file"
                                {...register("image")}
                                className=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                onChange={handleFileChange}
                              />

                              <button
                                className="bg-gradient-to-l from-green-400 p-5 rounded-md mt-2 ml-20"
                                type="submit"
                                variant="outlined"
                              >
                                {loadingAvatar ? (
                                  <>
                                    <p>Subiendo, espere...</p>
                                    <Loading />
                                  </>
                                ) : (
                                  "Presione para subir"
                                )}
                              </button>
                            </div>
                          ) : (
                            <div className="ml- md:-ml-32">
                              <button
                                onClick={setAvatarAndCloseEmailAndUsername}
                                className="bg-gradient-to-l from-cyan-400 p-5 rounded-md"
                              >
                                Subir imagen de perfil
                              </button>
                            </div>
                          )}
                        </div>
                      </form>
                    )}
                  </div>

                  <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                    <div className="flex flex-col items-center w-full md:mx-16 mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6 ">
                      <div className="w-full">
                        <FormUsername
                          profile={profile}
                          profileErrors={profileErrors}
                          setEditMode={setEditMode}
                          editMode={editMode}
                        />
                      </div>

                      <div className="w-full">
                        <FormEmail
                          profile={profile}
                          profileErrors={profileErrors}
                          setEditMode={setEditMode}
                          editMode={editMode}
                        />
                      </div>

                      <div className="w-full">
                        <FormUpdatePassword
                          profile={profile}
                          profileErrors={profileErrors}
                          setEditMode={setEditMode}
                          editMode={editMode}
                        />
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-6">
                      {profile &&
                        Array.isArray(profile.datos_personales) &&
                        profile.datos_personales.map(
                          (datosPersonales, index) => (
                            <div key={index} className="mb-6">
                              <button
                                onClick={() => {
                                  setShowPersonalData((prev) => !prev);
                                }}
                                className="text-xl font-semibold mb-2"
                              >
                                {" "}
                                Datos personales{" "}
                                {showPersonalData ? (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6 shadow-sm shadow-black rounded-md"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                      />
                                    </svg>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                       strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6 shadow-sm shadow-black rounded-md"
                                    >
                                      <path
                                         strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                      />
                                      <path
                                         strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                      />
                                    </svg>
                                  </>
                                )}
                              </button>
                              {Object.entries(datosPersonales).map(
                                ([campo, valor], i) => (
                                  <div
                                    key={i}
                                    className={`mb-4 ${
                                      showPersonalData ? "block" : "hidden"
                                    } `}
                                  >
                                    <label
                                      htmlFor={`campo-${i}`}
                                      className="block text-sm font-medium text-indigo-900 dark:text-white uppercase"
                                    >
                                      {campo}
                                    </label>
                                    <p
                                      id={`campo-${i}`}
                                      className="block p-2.5 text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
                                    >
                                      {valor}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                    </div>

                    <div className="mb-6 "></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {itemProfile == "admin" && (
          <div className="mx-auto md:w-md  -mt-10 md:block w-full ">
            <AdminPanel />
          </div>
        )}

        {itemProfile === "user-data" && (
          <div className="mx-auto w-full md:w-screen min-h-screen  md:block">
            <FormAddUserData setStatus={setIsAdmin} status={isAdmin} />
          </div>
        )}

        {itemProfile === "pre-inscrito" && (
          <div className="mx-auto w-full md:w-screen min-h-screen  md:block">
            <TusPreInscripciones pre_inscripcion={profile.id} />
          </div>
        )}

        {itemProfile === "inscrito" && (
          <div className="mx-auto w-full md:w-screen min-h-screen  md:block">
            <Tusinscripciones inscripcion={profile.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePagetest;
