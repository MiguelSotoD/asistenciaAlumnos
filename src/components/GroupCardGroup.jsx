import CardGroup from "./CardGroup"
export default function GroupCardGroup() {
    return(
        <>
         <h1 className="text-2xl sm:ml-34 ml-0 mb-6">Lista de grupos</h1>
        <div className="grid grid-cols-1 gap-4 mb-10">
            <CardGroup />
            <CardGroup />
            <CardGroup />
            <CardGroup />
        </div>
        </>
        
    )
}