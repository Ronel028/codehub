const Select = (props) => {
    return (
        <>
            <div>
                <select {...props} className={`w-full border ${props.error ? 'border-red-500 focus:outline-red-500' : 'border-light-gray focus:outline-primary'} outline-none p-2 text-xs rounded-md`} >
                    <option selected value='' >---Choose category---</option>
                    {
                        props.data.map((item, index) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })
                    }
                </select>
                {props.error && <p className=" text-xs text-red-500">{props.error}</p>}
            </div>
        </>
    )
}

export default Select;