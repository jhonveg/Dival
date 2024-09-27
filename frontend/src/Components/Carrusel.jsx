import Header_Placeholder from '../assets/headerWall.webp'
import { useEffect, useState } from "react";
import bateria from '../assets/bateria.webp'
import guitarra from '../assets/guitarra.webp'
import bajo from '../assets/bajo.webp'
import violin from '../assets/violin.webp'

export const Carrusel_MD = ({ Header, Position }) => {
    return (
        <div>


            <header>
                <div
                    className="relative bg-cover bg-no-repeat border-b-4 border-cyan-600 h-screen  rounded-lg bg-header md:block hidden  w-screen"
                    style={{
                        backgroundPosition: `${Position}`,
                        backgroundImage: `url(${Header || Header_Placeholder})`,
                        width: '100%',
                        height: '800px'
                    }}
                    
                >
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-fixed    "
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    >
                        <div className="">
                            <div className="px-4 md:px-6 lg:px-8 xl:px-10 md:mt-20 text-center text-white ">
                                <div className=' bg-opacity-50 backdrop-blur-md  fade-in slide-up'>
                                <h1 className="mb-4 text-2xl md:text-3xl lg:text-5xl font-bold font-serif  tracking-widest">
                                    ¡Bienvenido!
                                </h1>
                                </div>
                                {/* <h3 className="mb-6 text-xl md:text-2xl lg:text-3xl font-bold">
                                    Academia Musical Diversidad!
                                </h3> */}
                                <button
                                    type="button"
                                    className="inline-block rounded border-2 border-neutral-50 px-3 md:px-4 lg:px-6 py-2 text-sm md:text-base font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 mt-[560px]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Conócenos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}


export const Carrusel_Mobile = ({ Header, Position }) => {
    return (
        <div className=''>


            <header>
                <div
                    className="relative bg-cover bg-no-repeat border-b-4 border-cyan-600 h-screen  rounded-lg r md:hidden block "
                    style={{
                        backgroundPosition: `-350px 20px`,
                        backgroundImage: `url(${Header || Header_Placeholder})`,
                        width: '100%',
                        height: '800px'
                    }}
                    
                >
                    <div
                        className="absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-fixed "  
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    >
                        <div className="">
                            <div className="px-4 md:px-6 lg:px-8 xl:px-10 text-center text-white">
                                <h1 className="mb-4 text-2xl md:text-3xl lg:text-5xl font-bold  mt-[200px] ">
                                    ¡Bienvenido a{' '}
                                </h1>
                                 <h3 className="mb-6 text-xl md:text-2xl lg:text-3xl font-bold">
                                    Academia Musical Diversidad!
                                </h3> 
                                <button
                                    type="button"
                                    className="inline-block rounded border-2 border-neutral-50 px-3 md:px-4 lg:px-6 py-2 text-sm md:text-base font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 "
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Conócenos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}



export const FormSlidersImages = () => {

    const [imagenActual, setImagenActual] = useState(0);

    const imagenes = [bateria, bajo, guitarra, violin]



    useEffect(() => {
        const intervalo = setInterval(() => {

            setImagenActual((prevImagen) => (prevImagen + 1) % imagenes.length)
        }, 3000)

        return () => clearInterval(intervalo);

    }, [])


    return (

        { imagenActual, imagenes}




    )
}

