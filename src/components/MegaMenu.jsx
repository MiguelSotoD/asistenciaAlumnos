import { useNavigate } from "react-router-dom"
function MegaMenu() {
    const navigate = useNavigate();
  return (
<nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900 mb-7">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a onClick={()=> navigate('/Inicio-alumnos')} className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <img src="https://i0.wp.com/utd.edu.mx/wp-content/uploads/2022/07/LOGO-UTD-NUEVO-2022_solo-01.png?fit=1024%2C387&ssl=1" className="h-10" alt="Flowbite Logo" />
        </a>
        <button data-collapse-toggle="mega-menu-full-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-full-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div id="mega-menu-full-cta" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                <li>
                    <a onClick={()=> navigate('/Inicio-alumnos')} className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer" aria-current="page">Inicio</a>
                </li>
                <li>
                    <a onClick={()=> navigate('/Lista-alumnos')} className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-yellow md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer">Listas</a>
                </li>
                
                <li>
                    <a onClick={()=> navigate('/')} className="text-white bg-button-primary hover:bg-button-secondary font-medium rounded-lg text-md px-3 py-1 md:px-3 md:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer">Sign up</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

  )
}

export default MegaMenu