import { AiOutlineLoading } from "react-icons/ai";

const Button = (props) => {
    return (
        <>
            <button
                type="button"
                onClick={props.event}
                className={`font-bold border border-[#415A77] bg-[#415A77] hover:bg-opacity-80 transition-colors ease-linear duration-150 py-2 flex items-center gap-1 text-xs rounded px-3 text-[#E0E1DD] tracking-wide ${props.className}`}
            >
                {props.children}
                {props.loading ? <AiOutlineLoading className="animate-spin" /> : null}
            </button>
        </>
    )
}

export default Button