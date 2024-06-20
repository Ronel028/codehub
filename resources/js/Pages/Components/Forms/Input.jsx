const Input = (props) => {
    return (
        <>
            <div className={props.className}>
                {
                    props.label !== null ? <label htmlFor="username" className=" block text-sm tracking-wide font-semibold">{props.label}</label> : null
                }
                <input {...props} className={`w-full border ${props.error ? 'border-red-500 focus:outline-red-500' : 'border-[#415A77] focus:outline-[#778DA9]'} bg-[#0D1B2A] outline-none p-2 text-xs rounded-md`} />
                {props.error && <p className=" text-xs text-red-500 mt-1">{props.error}</p>}
            </div>
        </>
    )
}

export default Input;