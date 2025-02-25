import CardGroup from "./CardGroup"
export default function GroupCardGroup() {
    return(
        <div className="grid grid-cols-1 gap-4 ">
            <CardGroup />
            <CardGroup />
            <CardGroup />
            <CardGroup />
        </div>
    )
}