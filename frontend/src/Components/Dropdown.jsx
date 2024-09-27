
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Eye from '@mui/icons-material/RemoveRedEye';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Dropdown = ({color, clase}) => {


    const [drop, setDrop] = useState(false)




    useEffect(() => {

        const time = setTimeout(() => {

            if (drop === true) {
                setDrop(false);
            }


        }, 10000)

        return () => clearTimeout(time)

    }, [drop])

    return (


        <>



            <button id="dropdownHoverButton"
            onClick={() => {setDrop(prevDrop => !prevDrop)}}  
            data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className={`${color} ${clase} 0 h rounded-md  mt-2 hover:p-0 text-sm font-medium`} type="button">Sobre Nosotros <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">

            </svg>


            </button>


            <div onMouseLeave={() => {setDrop(false)}} id="dropdownHover"
                className={`absolute z-10 -ml-4  -mt-2 w-32 origin-top-right rounded-md bg-white py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${drop ? "block" : "hidden"}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
            >


                <Link Link to={"/"}>

                    <p
                        
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-zinc-950 hover:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                    >
                        <Eye sx={{ fontSize: 15 }} /> Visión
                    </p>


                </Link>




                <Link to={"/"}>


                    <p
                        
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-zinc-950 hover:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                    >
                        <BookmarkIcon sx={{ fontSize: 15 }} /> Misión
                    </p>

                </Link>



                <p
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-zinc-950 hover:text-white"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                >
                    Encuéntranos
                </p>

            </div>
        </>
    )
}

export default Dropdown