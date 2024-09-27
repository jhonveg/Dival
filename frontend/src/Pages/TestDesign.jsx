import { Link } from "react-router-dom";
import logo from "../assets/dival_logo.png";
const TestDesign = () => {
  return (
    <div className="">
      <div className="min-h-screen bg-gradient-to-r from-dival to-cyan-600 h-screen w-full  md:w-screen flex flex-col justify-center items-center fade-in ">
        <h1 className="text-4xl md:text-6xl text-white font-extrabold mb-6 text-center">
          ¡Bienvenido a la Academia Musical Diversidad!
        </h1>
        <p className="text-lg md:text-xl md:mx-auto ml-10 text-white mb-8">
          Descubre y perfecciona tus habilidades musicales con nosotros.
        </p>

        <div className="flex flex-wrap  space-x-3">
          <div className="flex">
            <Link to={"/nosotros"}>
              <button className="bg-black hover:bg-white text-dival font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:scale-105">
                Conocenos
              </button>
            </Link>
          </div>

          <div className="flex ">
            <Link to={"/register"}>
              <button className="bg-black hover:bg-white text-dival font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:scale-105">
                Únete a nosotros
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <img src={logo} width={"50px"} height={"50px"} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TestDesign;
