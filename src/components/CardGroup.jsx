export default function CardGroup() {
    return (
            <div className="bg-gray-300 hover:bg-zinc-400 text-black p-4 rounded-lg flex flex-col justify-between items-start w-full max-w-md h-26 relative ml-0 sm:ml-34 sm:max-w-full md:max-w-1/2">
            <div>
                <h2 className="text-lg font-semibold">8A</h2>
                <p className="text-sm">Ingeniería en desarrollo y gestión de software</p>
            </div>
            <button className="text-white bg-button-primary hover:bg-button-secondary font-medium rounded-lg text-sm px-4 py-1 md:px-4 md:py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 absolute bottom-2 right-4 cursor-pointer">Ir</button>
            </div>
    );
}
