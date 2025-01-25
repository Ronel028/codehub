import Beatloader from 'react-spinners/BeatLoader'

const Button = ({ type="button", onClick, processing = false, title, icon, variant="filled" }) => {
    return (
        <button type={type} onClick={onClick} disabled={processing} 
            className={`${variant === 'outlined' ? 'button-outlined' : 'button-filled'} border inline-flex w-full h-9 items-center justify-center rounded px-3 py-2 text-sm font-semibold shadow-sm hover:bg-opacity-90 sm:w-auto`}>
            {processing ? null : (
                <span className=' flex items-center gap-1'>
                    {icon}
                    {title}
                </span>
            )}
            {
                !processing ? null : (
                    <Beatloader
                        color={'#F9F9F9'}
                        loading={processing}
                        size={7}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )
            }
        </button>
    )
}

export default Button