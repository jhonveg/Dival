import { useAuth } from "../Context/authContext";
import "react-toastify/dist/ReactToastify.css";
import TestDesign from "./TestDesign";


const HomePage = () => {
  const { user, getProfile } = useAuth();

  return (
    <main className="w-full  overflow-x-hidden snap-y relative snap-mandatory overflow-y-auto h-screen min-h-screen">
      <div className="snap-center min-h-screen">
        <TestDesign />
      
      </div>

      {/* <div className="snap-center  md:block hidden">
        <Carrusel_MD Header={one_image} Position={"0px 0px"} />
      </div>

      <div className="snap-center md:hidden block">
        <Carrusel_Mobile Header={panoramica} Position={"0px -390px "} />
      </div>
      <div className="snap-center  md:hidden block">
        <Carrusel_Mobile Header={one_image} Position={"0px 0px"} />
      </div> */}
    </main>
  );
};

export default HomePage;
