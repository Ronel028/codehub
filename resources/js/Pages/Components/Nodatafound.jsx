import empty from "../Assets/Img/code.svg"

const NoDataFound = ({ title, content }) => {
    return (
        <>
            <div className=" flex flex-col items-center justify-center">
                <img width={500} className="mb-4" src={empty} alt="empty" />
                <h1 className=" font-bold text-7xl uppercase">{title}</h1>
                <h2 className=" text-xl font-bold tracking-wide">
                    {content}
                </h2>
            </div>
        </>
    )
}

export default NoDataFound