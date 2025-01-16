const Input = (props) => {

    return (
        <>
            <div className={props.className}>
                {
                    props.label !== null ? <label htmlFor="username" className=" block text-sm text-primary tracking-wide">{props.label}</label> : null
                }
                {
                    props.type === 'password' ? (
                        <>
                            <div className=" relative">
                                <input {...props} className={`w-full border ${props.error ? 'border-red-500 focus:outline-red-500' : 'border-[#415A77] focus:outline-[#778DA9]'} bg-[#0D1B2A] outline-none p-2 text-xs rounded-md`} />
                                {props.error && <p className=" text-xs text-red-500 mt-1">{props.error}</p>}
                            </div>
                        </>
                    ) : (
                        <>
                            <input {...props} className={`w-full border ${props.error ? 'border-red-500 focus:outline-red-500' : 'border-light-gray focus:outline-[#778DA9]'} bg-white outline-none p-2 text-xs placeholder:text-light-gray text-primary rounded-md`} />
                            {props.error && <p className=" text-xs text-red-500 mt-1">{props.error}</p>}
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Input;