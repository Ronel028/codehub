import empty from "../Assets/Img/empty.webp"

const NoDataFound = ({ content }) => {
    return (
        <>
            <div className=" flex flex-col items-center justify-center">
                <img width={150} height={150} src={empty} alt="empty" />
                <h1 className=" text-xl font-bold tracking-wide">
                    {content}
                </h1>
            </div>
        </>
    )
}

export default NoDataFound