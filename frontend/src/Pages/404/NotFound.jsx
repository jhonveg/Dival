import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">
                404
            </h1>
        <h2 className="text-6xl font-bold text-gray-800 mb-4">
          Página no encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! La página que estás buscando no existe.
        </p>
        <Link to={"/"} className="text-blue-500 hover:underline">
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
