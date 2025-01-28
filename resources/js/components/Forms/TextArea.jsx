const TextArea = (props) => {

    return (
        <>
            <div className={props.className}>
                {
                    props.label !== null ? <label htmlFor={props.id} className=" block text-sm text-dark-gray tracking-wide mb-1">{props.label}</label> : null
                }
                <div>
                    <textarea {...props} className={`w-full border ${props.error ? 'border-red-500 focus:outline-red-500' : 'border-gray-light focus:outline-meduim-gray'} bg-soft-light outline-none p-2 text-xs rounded-md`}></textarea>
                    <div className="flex items-center justify-between mt-1">
                        <div>
                            {props.error && <p className=" text-xs text-red-500">{props.error}</p>}
                        </div>
                        <p className=" text-xs text-dark-gray">{props.strlength ?? 0}/<span className="">150-300</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TextArea;