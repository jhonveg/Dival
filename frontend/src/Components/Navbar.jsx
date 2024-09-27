import { Typography } from "@mui/material";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import divalLogo from "../assets/dival logo.png";
import { Home } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import UserPlaceholder from "@mui/icons-material/AccountBox";
import icon_placeholder from "../assets/icon_placeholder.png";
import { BackButton, NextButton } from "../Components/GoBackButton";

const Navbar = () => {
  const { logout, Autenticado, getProfile, profile } = useAuth();
  const location = useLocation();

  // abrir desplegable de usuario
  const [navUser, setNavUser] = useState(false);

  const [navMobile, setNavMobile] = useState(false);

  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const [actualPage, setActualPage] = useState('home')




  const handleScroll = () => {
    setNavbarVisibility(window.scrollY < 50);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const routeNames = {
    "/": "Inicio",
    "/register": "Registrarse",
    "/login": "Iniciar Sesión",
    "/cursos": "Cursos",
    "/tasks": "Tus tareas",
    "/add-task": "Agregar Tareas",
    "/profile": "Perfil",
    "/admin/panel": "Panel administrativo",
    "/admin/users": "Administrar usuarios",
    "/admin-cursos": "Administrar cursos",
    "/add-cursos": "Agregar cursos",
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const currentPage =
      routeNames[location.pathname] || "Academia Musical Diversidad";
    document.title = `${currentPage}`;
  }, [location]);

  useEffect(() => {
    const Time = setTimeout(() => {
      if (navUser === true) {
        setNavUser(false);
      }

      if (navMobile === true) {
        setNavMobile(false);
      }
    }, 5000);

    return () => clearTimeout(Time);
  }, [navUser, navMobile]);

  const [home, setHomeIcon] = useState("white");

  useEffect(() => {
    if (Autenticado) {
      setHomeIcon("transition ease-in-out delay-150 ");
    } else {
      setHomeIcon(" transition ease-in-out delay-150 ");
    }
  }, [Autenticado]);

  return (
    <>
      <nav
        className={`fixed top-0 z-10 w-[100%]  p-1  bg-dival bg-opacity-90 md:bg-opacity- 
      md:rounded-sm rounded-sm  ${
        isNavbarVisible
          ? "md:bg-opacity-80  md:bg-black  backdrop-blur-sm md:text-white backdrop-filter backdrop-grayscale"
          : ""
      }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  ">
          <div className="relative flex h-16 items-center justify-center ">
            <div className="max-w-7xl px-2 sm:px-6 lg:px-8 hidden md:block justify-start">
              <Link  onClick={() => {setActualPage('home')}} to={"/"}>
                <img
                  className="h-[50px] w-[50px] mr-4"
                  src={divalLogo}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="md:hidden  justify-center mx-auto">
             <Link to={"/"}>
             <img
                className="h-[50px] w-[50px] p-2 "
                src={divalLogo}
                alt="Logo"
              />
             </Link>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
              <button
                type="button"
                onClick={() => {
                  setNavMobile((prevState) => !prevState);
                }}
                className="relative  items-center justify-center  rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-zinc-800"
                aria-controls="mobile-menu"
                aria-expanded={navMobile ? "true" : "false"}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only"></span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex mx-auto items-center justify-center">
              <div className="hidden mt-4 sm:ml-6 sm:block ">
                <div className="flex space-x-4 bg-dival pb-1 shadow-md shadow-black  p- bg-opacity-60 rounded-lg  mb-3">
                 
                 <div className="pt-2" onClick={() => {setActualPage('home')}}>
                 <BackButton />
                 </div>

                  <NavLink  className={"-mb-60"} onClick={() => {setActualPage('home')}} to={"/"}>
                    <p
                      className={`${home} text-white -z-30 rounded-md px-3 py-2 text-sm font-medium hover:scale-110 `}
                      aria-current="page"
                    >
                      <Home  />
                    </p>
                  </NavLink>

                  <NavLink to={"/cursos"}>
                    <div className="flex">
                      <p onClick={() => {setActualPage("cursos")}}
                        
                        className={`text hover:scale-110 ${actualPage == 'cursos' && 'text-black font-semibold animate-pulse'}  rounded-md px-3 py-2 text-sm font-medium tracking-widest`}
                      >
                        Cursos
                      </p>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                      </svg> */}
                    </div>
                  </NavLink>

                  <NavLink>
                    <div className="flex">
                      <Link onClick={() => {setActualPage('nosotros')}} to={"/nosotros"}>
                        <p className={` hover:scale-110 tracking-widest pt-2 text-sm  ${actualPage === 'nosotros' && "text-black font-semibold animate-pulse"}`}>
                          Sobre Nosotros
                        </p>
                      </Link>
                      {/* 
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-6"
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
                      </svg> */}
                    </div>
                  </NavLink>

                  <NavLink onClick={() => {setActualPage('contactanos')}} to={"/contactanos"}>
                    <div className="flex">
                      <p className={`hover:scale-110 rounded-md px-3 py-2 text-sm font-medium tracking-widest ${actualPage === 'contactanos' && "text-black font-semibold animate-pulse"}`}>
                        Contáctanos
                      </p>
                      {/* 
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                      </svg> */}
                    </div>
                  </NavLink>

                      <div className="pt-2" onClick={() => {setActualPage('home')}}> 
                      <NextButton />
                      </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hidden"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="relative ml-3  hover:shadow-dival hover:shadow-sm rounded-md">
                <div className="">
                  <button
                    onClick={() => {
                      setNavUser((prevNav) => !prevNav);
                    }}
                    type="button"
                    className="relative flex rounded-full text-sm "
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>

                    {Autenticado ? (
                      <div  className="flex  bg-none  bg-opacity-60 rounded-lg px-2 py-3 pr-5 pl-5 md:space-x-10  ">
                        {profile.avatar && profile.avatar.secure_url ? (
                          <>
                            <img  
                              className="w-10 h-10 rounded-full md:-mt-1 md:-mr-0 mt-3 ml-12 md:ml-2 -mr-5 border-r-4 border-l-4 border-t-4 border-b-4 border-zinc-900 absolute left-0 "
                              src={profile.avatar.secure_url}
                              alt="Rounded avatar"
                            />

                            <p  className="text-sm ml-7 mt-14 md:mt-0 ">
                              {profile.username}
                              <svg
                                className="w-1.5 h-1.5 hidden md:block  md:ml-7  ms-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 4 4 4-4"
                                />
                              </svg>
                            </p>
                          </>
                        ) : (
                          <>
                            <img
                              src={icon_placeholder}
                              alt="avatar"
                              className="w-10 h-10 rounded-full md:-mt-1 md:-mr-0 mt-3 ml-6 md:ml-2 -mr-5 border-r-4 border-l-4 border-t-4 border-b-4 border-zinc-900 absolute left-0"
                            />
                            <p className="text-sm ml-7 mt-14 md:mt-0 ">
                              {profile.username}
                              <svg
                                className="w-1.5 h-1.5  md:ml-7  ms-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 4 4 4-4"
                                />
                              </svg>
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <Typography
                          className=" shadow-sm  p-1  bg-opacity-60 rounded-lg pt- -"
                          sx={{ ml: 2, mt: 2 }}
                          variant="h7"
                          color={"white"}
                        >
                          <UserPlaceholder sx={{ width: "px" }} />
                          Visitante
                          <div className="md:ml-3 ml-10 ">
                            <svg
                              className="w-2.5 h-2.5 md:ml-7 ml-7 ms-1"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </div>
                        </Typography>
                      </>
                    )}
                  </button>
                </div>

                <div
                  onMouseLeave={() => {
                    setNavUser(false);
                  }} onClick={() => {setActualPage("home")}}
                  className={`absolute z-10 md:mt-[7px] mt-[5px] md:-ml-7 -ml-11 w-48 origin-top-right rounded-md bg-dival 
                    py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none   ${
                      navUser ? "block" : "hidden"
                    }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  {Autenticado && profile.rol === "admin" && (
                    <NavLink to={"/admin/panel"}>
                      <button
                        className="block tracking-widest md:w-full px-3 py-2 text-sm md:text-gray-700  hover:bg-zinc-950 hover:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Panel Administrador
                      </button>
                    </NavLink>
                  )}
                  {Autenticado ? (
                    <>
                      <NavLink to={"/profile"}>
                        <button
                          className="block tracking-widest px-4 py-2 md:w-full text-sm md:text-gray-700 text-black hover:bg-zinc-950 hover:text-white"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          Perfil
                        </button>
                      </NavLink>

                      <NavLink>
                        <button
                          onClick={logout}
                          href=""
                          className="block tracking-widest px-4 py-2 md:w-full text-sm md:text-gray-700 text-black hover:bg-zinc-950 hover:text-white"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-2"
                        >
                          Cerrar sesión
                        </button>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to={"/register"}>
                        <p
                          
                          className="block px-4 py-2 text-sm md:text-gray-700 text-black hover:bg-zinc-950 hover:text-white"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          Registrarse
                        </p>
                      </NavLink>

                      <NavLink to={"login"}>
                        <p
                          
                          className="block px-4 py-2 text-sm md:text-gray-700 hover:bg-zinc-950 hover:text-white"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-1"
                        >
                          Iniciar Sesión
                        </p>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden " id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 ">
            {navMobile && (
              <div className="">
                <NavLink to={"/cursos"}>
                  <p
                    className=" text-black block rounded-md px-3 py-2 text-sm font-medium hover:scale-105"
                    aria-current="page"
                  >
                    Cursos
                  </p>
                </NavLink>

                <NavLink
                  to={"/nosotros"}
                  className="  text-black block rounded-md px-3 py-2 sm font-medium"
                  aria-current="page"
                >
                  <p className="text-black hover:scale-110 hover:text-white tracking-widest  text-sm ">
                    Sobre nosotros
                  </p>
                </NavLink>

                <NavLink
                  to={"/contactanos"}
                  className=" text-black block rounded-md px-3 py-2 text-sm font-medium hover:scale-105"
                  aria-current="page"
                >
                  Contactanos
                </NavLink>
              </div>
            )}
          </div>
          {navMobile && (
            <div
              onClick={() => {
                setNavMobile(false);
              }}
              className="ml-52"
            >
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
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                />
              </svg>{" "}
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
