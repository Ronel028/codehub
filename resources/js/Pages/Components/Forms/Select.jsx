const Select = (props) => {
    return (
        <>
            <div className=" w-full">
                <select {...props} className={`w-full border ${props.error ? 'border-red-500 focus:outline-red-500' : 'border-[#415A77]  focus:outline-[#778DA9]'} bg-[#0D1B2A] outline-none p-2 text-xs rounded-md`} >
                    <option value='' >---Choose category---</option>
                    {
                        props.data.map((item, index) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })
                    }
                </select>
                {props.error && <p className=" text-xs text-red-500 mt-1">{props.error}</p>}
            </div>
        </>
    )
}

export default Select;