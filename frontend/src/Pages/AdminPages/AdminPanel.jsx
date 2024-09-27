import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from "@mui/icons-material/Add";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useAuth } from "../../Context/authContext";
import icon_placeholder from "../../assets/icon_placeholder.png";
import {  Pageview, PersonSearch } from "@mui/icons-material";
import FindInPageIcon from '@mui/icons-material/FindInPage';

const AdminPanel = () => {
  const [openDropdown, setOpenDropdown] = useState(true);
  const [gestCursos, setGestCursos] = useState(false);
  const [gestUsers, setGestUsers] = useState(true);

  const { profile } = useAuth();

  const openDropdownMenu = () => {
    setOpenDropdown(true);
  };
 
  const openGestCursosMenu = () => {
    setGestCursos(true);
    setGestUsers(false);
  };

  const openGestUsersMenu = () => {
    setGestUsers(true);
    setGestCursos(false);
  };

  return (
    <section className=" bg-opacity-70   ">
      <div className="container mx-auto p-8 min-h-screen  w-auto pt-20 ">
        <nav className="bg-black  p-4  md:w-[1170px]  rounded-md mb-6 mt-5 text-center fade-in">
          <span className="text-white font-bold text-lg ">
            Panel Administrativo
          </span>
        </nav>

        <div
          className={`flex ${openDropdown ? "slide-up-2 fade-in-2" : "justify-center"
            } transition-all ease-in delay-200 ml`}
        >
          <div
            className={` bg-black bg-opacity-100 p-4 rounded-md ${openDropdown ? "md:w-1/5" : "md:w-1/4"
              }`}
          >
            <div className="text-center">
             
                <Link to={"/profile"} target="blank">
                <img
                src={profile.avatar.secure_url || icon_placeholder}
                alt="avatar"
                className="rounded-full mx-auto mb-4"
                style={{ width: "120px", height: "120px" }}
              />
                </Link>

              <div className="bg-dival text-black p-2 rounded-md mb-4">
                <p className="text-xl font-bold">{profile.username}</p>
                <p className="text-sm">Administrador</p>
              </div>
              <button
                onClick={openDropdownMenu}
                className={`text-white ${openDropdown ? "hidden" : "block"
                  } mb-4`}
              >
                Gestionar
                <svg
                  className="w-3 h-3 ml-1 inline"
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
              </button>
            </div>

            <div
              className={`${openDropdown ? "block" : "hidden"} text-white mt-4`}
            >
              <ul className="space-y-2">
                <li
                  onMouseEnter={() => openGestUsersMenu(true)}
                  onMouseLeave={() => openGestUsersMenu(false)}
                  onClick={() => openGestUsersMenu(!gestUsers)}
                  className={`p-2 cursor-pointer rounded-md ${gestUsers
                      ? "bg-dival text-black"
                      : "hover:bg-dival hover:text-black"
                    }`}
                >
                  <GroupIcon className="inline mr-2" />
                  Gestionar Usuarios
                </li>

                <li
                  onMouseEnter={() => openGestCursosMenu(true)}
                  onMouseLeave={() => openGestCursosMenu(false)}
                  onClick={() => openGestCursosMenu(!gestCursos)}
                  className={`p-2 cursor-pointer rounded-md ${gestCursos
                      ? "bg-dival text-black"
                      : "hover:bg-dival hover:text-black"
                    }`}
                >
                  <LibraryBooksIcon className="inline mr-2" />
                  Gestionar Cursos
                </li>
              </ul>
            </div>
          </div>

          {openDropdown && (
            <div className="w-3/4  rounded-md p-4 ml-4 bg-black  text-white h-full ">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">¿Qué deseas hacer?</h2>
              </div>

              {gestUsers && (
                <ul className="space-y-2 ">
                  <Link to={"/admin/users"}>
                    <li className="p-2 rounded-md hover:bg-dival hover:scale-105 transition-all delay-50 ">
                      <PersonSearch className="inline mr-2" />
                      Consultar Usuarios
                    </li>
                  </Link>

                  <Link to={"/admin/inscripciones"}>
                    <li className="p-2 rounded-md hover:bg-dival hover:scale-105 transition-all delay-50">
                      <FindInPageIcon className="inline mr-2" />
                      Consultar Pre Inscripciones
                    </li>
                  </Link>

                  <Link to={"/admin/inscritos"}>
                    <li className="p-2 rounded-md hover:bg-dival hover:scale-105 transition-all delay-50">
                      <VisibilityIcon className="inline mr-2" />
                      Consultar Inscritos
                    </li>
                  </Link>


                </ul>
              )}

              {gestCursos && (
                <ul className="space-y-2">
                  <Link to={"/admin/cursos"}>
                    <li className="p-2 rounded-md hover:bg-dival hover:scale-105 transition-all delay-50">
                      <Pageview className="inline mr-2" />
                      Consultar Cursos
                    </li>
                  </Link>
                  <Link to={"/add-cursos"}>
                    <li className="p-2 rounded-md hover:bg-dival hover:scale-105 transition-all delay-50">
                      <AddIcon className="inline mr-2" />
                      Crear Cursos
                    </li>
                  </Link>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
