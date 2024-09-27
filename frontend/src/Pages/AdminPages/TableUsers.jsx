import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/authContext";
import { useForm } from "react-hook-form";
import UsersFormPage from "./usersForm";
import { AlertInfo } from "../../Components/Alert";

const LeftArrow = ({ previousPage }) => {
  return (
    <button className="hover:scale-110" onClick={previousPage}>
      <svg
        className="w-6 h-6 text-gray-800  dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
        />
      </svg>

      <div className="-ml-4 mt-2 font-bold text-white">Anterior</div>
    </button>
  );
};

const RightArrow = ({ nextPage }) => {
  return (
    <button className="hover:scale-110" onClick={nextPage}>
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
        />
      </svg>
      <div className="-ml-4 mt-2 font-bold text-white">Siguiente</div>
    </button>
  );
};

const CardUsers = ({ users }) => {
  const { deleteUser} = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [formUser, setFormUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { register, handleSubmit } = useForm();
  const [pagination, setPagination] = useState(1);
  const { getUsers, allUsers, pages } = useAuth();
  const [formRendered, setFormRendered] = useState(false);

  const formContainerRef = useRef(null);


  useEffect(() => {
    getUsers(pagination);
  }, [pagination]);

  useEffect(() => {
    if (formUser && formRendered) {
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [formUser, formRendered]);

  const nextPage = () => {
    if (pagination < pages) {
      setPagination((prevPagination) => prevPagination + 1);
    } else {
      setPagination(pages);
    }
  };

  const previousPage = () => {
    if (pagination > 1) {
      setPagination((prevPagination) => prevPagination - 1);
    } else {
      setPagination(1);

      AlertInfo({
        title: "No hay más contenido para mostrar",
        icon: "info",
      });
    }

  };

  const handleSUbmit = handleSubmit((data) => {
    console.log(data);
  });

  const openForm = () => {
    setFormUser(true);
  };
  const closeForm = () => {
    setFormUser(false);
  };

 

 const filteredUsers = allUsers.filter((user) =>
 user.email.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
 user.rol.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
 user.username.toLowerCase().includes(searchTerm.trim().toLowerCase())
);

  return (
    <div className="flex items-center justify-center  min-h-screen ">
  <div className="relative p-4 md:p-8 w-full max-w-screen-xl min-h-screen ">
    {!formUser && (
      <>
        <input
          type="text"
          placeholder="Buscar por correo electrónico, nombre o rol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md md:mr-2 md:ml-0 w-full md:w-full mb-2"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2  border border-blue-700 mb-2 rounded md:mt-0 mt-2 w-full md:w-auto"
        >
          Limpiar búsqueda
        </button>
      </>
    )}

    <div className={`overflow-x-auto ${formUser ? " transition-all delay-100 blur-[10px] pointer-events-none  grayscale" : "transition-all delay-100" } rounded-md`}>
      <table className="w-full bg-black text-white  ">
        <thead>
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Nombre de Usuario</th>
            <th className="p-4">Correo Electrónico</th>
            <th className="p-4">Rol</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {(searchTerm === "" ? users : filteredUsers).map((user) => (
            <tr key={user._id} className="bg-black shadow-white hover:border hover:shadow-blue">
              <td className="p-4">{user._id}</td>
              <td className="p-4">{user.username}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.rol}</td>
              <td className="p-4">
                <div className="flex items-center justify-center space-x-2">
                  <div
                    onClick={() => {
                      openForm();
                      setSelectedUser(user._id);
                    }}
                    className="cursor-pointer text-green-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => deleteUser(user._id)}
                    className="cursor-pointer text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-between mb-4">
      {pagination > 1 && (
        <button className="md:-ml-2 mt-2 rounded">
          <LeftArrow previousPage={previousPage} />
        </button>
      )}
      {pagination < pages && (
        <button className="py-2 md:px-[1030px] rounded">
          <RightArrow nextPage={nextPage} />
        </button>
      )}
    </div>

    <div className="text-xs text-white">
      <p>
        Página {pagination} de {pages}
      </p>
    </div>

    <div>
      {formUser && (
        <div
         
          className="absolute inset-x-3  inset-6 flex items-center justify-center"
        >
          <div  ref={formContainerRef} className="p-4">
            <UsersFormPage
              userId={selectedUser}
              onClose={closeForm}
              onRender={() => setFormRendered(true)}
            />
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default CardUsers;
