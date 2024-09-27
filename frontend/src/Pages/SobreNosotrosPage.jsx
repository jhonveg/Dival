import React from "react";
import banner from "../assets/academia_musical_diversidad_banner.webp";
import presentacion from "../assets/I_A_M_D/presentacion.webp";
import presentacion_2 from "../assets/I_A_M_D/presentacion_2.webp";
import presentacion_3 from "../assets/I_A_M_D/presentacion_3.webp";
import presentacion_4 from "../assets/I_A_M_D/presentacion_4.webp";
import presentacion_5 from "../assets/I_A_M_D/presentacion_5.webp";
import presentacion_6 from "../assets/I_A_M_D/presentacion_6.webp";

const SobreNosotrosPage = () => {
  return (
    <main className="md:w-screen w-full overflow-x-hidden snap-y relative snap-mandatory overflow-y-auto h-screen min-h-screen ">
      <div className="mt-[70px] snap-center fade-in-2  shadow-md  shadow-black">
        <div className="bg-gradient-to-r from-dival to-dival text-white py-12 text-center md:">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Descubre tu armonía
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl opacity-90">
              La Academia de Música que despierta tu pasión y creatividad.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 p-10 bg-zinc-900 md:backdrop-blur-md rounded-xl shadow-xl  shadow-black snap-start fade-in-2 slide-up-2 ">
        <p className="text-lg md:text-xl lg:text-2xl opacity-90 font-bold text-white ml-1">
          ¿Quiénes somos?
        </p>
        <div className="flex flex-wrap -mx-4 p-5 mt-10">
          <div className="w-full md:w-1/2 px-4 p-5 bg-opacity-90 rounded-xl">
            <p className="text-white r leading-loose font-bold">
              CORPORACION MUSICAL DIVERSIDAD
            </p>
            <p className="text-white text-justify">
              Hace once años, Robinson Correa y Willy Benítez fundaron la
              academia musical Diversidad con el objetivo de brindar formación
              musical a niños, jóvenes y adultos Bellanitas, con un enfoque
              social y a bajo costo, la corporación tiene experiencia en la
              enseñanza de distintos instrumentos, como: batería, bajo
              eléctrico, guitarra eléctrica, guitarra acústica, teclado, violín,
              iniciación musical, técnica vocal, entre otros, enfocados a
              estudiantes de distintas edades, credos, razas y orientaciones
              sexuales.
            </p>
            <p className="text-white leading-loose mt-4 justify-between"></p>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-8 flex flex-wrap justify-center space-x-3">
            <img
              src={presentacion_4}
              alt="Academia de Música"
              className="w-[170px] h-[300px] rounded-xl shadow-md transition-all delay-50 mb-2 flex  flex-wrap hover:shadow-dival  "
            />
            <img
              src={presentacion_5}
              alt="Academia de Música"
              className="w-[170px]  h-[300px] rounded-xl shadow-md transition-all delay-50  flex flex-wrap md:ml-2 mb-4 hover:shadow-dival   "
            />
            <img
              src={presentacion_6}
              alt="Academia de Música"
              className="w-[170px]  h-[300px] rounded-xl shadow-md transition-all delay-50  flex  flex-wrap mb-2 hover:shadow-dival "
            />
          </div>
        </div>
        <div className="mt- md:bg-opacity-90 bg-op p-5 -ml-3 rounded-xl text-white">
          <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios</h2>
          <p>
            La corporación musical diversidad ofrece clases teórico-prácticas de
            diversos instrumentos, lo que ha permitido obtener resultados muy
            positivos y de gran impacto para la sociedad, a lo largo de estos
            once años, se han realizado numerosas muestras musicales que
            evidencian el proceso musical y artístico de nuestros estudiantes.
          </p>
          <ul className="list-disc pl-4 mt-2">
            <li>Clases individuales y grupales</li>
            <li>Exploración de diferentes géneros musicales</li>
            <li>Estudio de grabación y producción musical</li>
            <li>Eventos y conciertos exclusivos</li>
          </ul>
        </div>

        <div className="mt-8 md:bg-opacity-90 bg-op p-5 -ml-3 rounded-xl text-white">
          <h2 className="text-2xl font-semibold mb-4">Fundación</h2>
          <p>
            La Corporación Musical Diversidad fue fundada en 2013 como academia
            musical y se constituyó legalmente como corporación en el año 2019.
          </p>
          <p className="mt-2">
            La idea de la corporación nació de los músicos y amigos Robinson
            Correa y Willy Benítez, con el objetivo principal de dar clases de
            excelente calidad y a bajo costo, para que muchas personas puedan
            acceder a todos los cursos y cumplir sus sueños, por esto el eslogan
            “ECONOMIA Y CALIDAD”
          </p>
        </div>

        <div className="my-8 md:">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Nuestro Espacio Creativo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div>
              <img
                src={presentacion}
                alt="Imagen 1"
                className="w-[400px] h-auto rounded-xl shadow-md hover:scale-110 transition-all delay-50 md:mb-0 hover:shadow-dival"
              />
            </div>
            <div>
              <img
                src={presentacion_2}
                alt="Imagen 2"
                className="w-[400px] h-auto rounded-xl shadow-md hover:scale-110 transition-all delay-50 hover:shadow-dival"
              />
            </div>
            <div>
              <img
                src={presentacion_3}
                alt="Imagen 3"
                className="w-[400px] h-auto rounded-xl shadow-md hover:scale-110 transition-all delay-50 hover:shadow-dival  "
              />
            </div>
          </div>
        </div>
      </div>

      <div
        id="mision-vision"
        className="snap-start fade-in-2 slide-up-2 mb-10 "
      >
        <div className="shadow-md  shadow-black ">
          <div className="bg-gradient-to-r from-dival to-dival text-white py-12 text-center ">
            <div className="container mx-auto mt-20 ">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Nuestra Visión
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                Ser la escuela de música líder del país con sedes en diferentes
                municipios y departamentos de Colombia.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-8 p-8 bg-zinc-900 md:backdrop-blur-md rounded-md  shadow-xl    shadow-black ">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full md:w-1/2 px-4">
              <p className="text-white leading-loose ml-5">
                En nuestra visión, nos esforzamos por ser la fuente de
                inspiración musical que transforma vidas. Creemos que la música
                tiene el poder de conectar, emocionar y motivar a las personas.
                Buscamos crear un espacio donde cada estudiante encuentre su
                pasión y descubra el potencial único que lleva dentro.
              </p>
            </div>

            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={banner}
                alt="Nuestra Visión"
                className="w-full h-auto rounded-3xl shadow-lg hover:scale-105 transition-all delay-100"
              />
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r bg-opacity-90 p-5  rounded-s-lg rounded-3xl text-white">
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <p className="text-whiteleading-loose">
              Formar niños, jóvenes y adultos bajo un programa musical
              pedagógico y didáctico integral de calidad, transmitiendo valores
              y principios que les permitan desarrollarse plenamente, e inculcar
              la premisa &quot;La música es una&quot; generando una cultura
              musical amplia y sin estigmatismos.
            </p>
          </div>

          {/* <div className="my-8 r">
                        <h2 className="text-2xl font-semibold mb-4 text-white ml-3">Nuestro Compromiso</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div><img src={banner} alt="Compromiso 1" className="w-full h-auto rounded-3xl shadow-lg hover:scale-110 transition-all delay-150" /></div>
                            <div><img src={banner} alt="Compromiso 2" className="w-full h-auto rounded-3xl shadow-lg hover:scale-110 transition-all delay-150" /></div>
                            <div><img src={banner} alt="Compromiso 3" className="w-full h-auto rounded-3xl shadow-lg hover:scale-110 transition-all delay-150" /></div>
                        </div>
                    </div> */}
        </div>
      </div>
    </main>
  );
};

export default SobreNosotrosPage;
