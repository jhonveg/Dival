import { Link } from 'react-router-dom'
import logo from '../assets/dival_logo_2.png'
import { useState } from 'react'

const Footer = () => {

    const [showFooter, setShowFooter] = useState(false);
    return (


<div >





<footer className={`relative transition-all delay-150   bg-zinc-900 rounded-t-sm  slide-up-2 `}>
<button className='  md:justify-center animate-pulse  ' onClick={() => {setShowFooter(prev => !prev)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
</svg>

</button>
<div className={`w-full  mx-auto max-w-screen-xl p-4 md:flex md:items-center relative justify-end md:justify-between  ${showFooter ? "md:hidden hidden " : "slide-up-2"}`}>
<span className="text-sm text-gray-500 sm:text-center relative md:block hidden  dark:text-gray-400">© 2024 Todos los derechos reservados
    </span>
   
    <ul className="flex flex-wrap md:left-0  items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 relative left-24">
        
        <li>
            <Link to={"/contactanos"} className="hover:underline me-4 md:me-6">Contáctanos</Link>
        </li>
        
        <li>
            <Link to={"https://www.facebook.com/academiadiversidad"}target='blank' className="hover:underline me-4 md:me-6">
            <i className="fa-brands fa-square-facebook"></i>
            </Link>
        </li>

        <li>
            <Link to={"https://www.instagram.com/academia_musical_diversidad/"} target='blank' className="hover:underline me-4 md:me-6">
            <i className="fa-brands fa-instagram"></i>
            </Link>
        </li>

    </ul>
    <span className="text-sm md:hidden block text-gray-500 sm:text-center relative left-10  dark:text-gray-400">© 2024 Todos los derechos reservados
    </span>
   
    </div>
</footer>



</div>



    )
}

export default Footer