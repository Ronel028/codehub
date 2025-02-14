import NotFoundImage from '../../assets/img/404.svg'

const NotFound = () => {
    return (
        <main className='min-h-screen w-full flex flex-col items-center justify-center'>
                <img 
                    src={NotFoundImage} 
                    alt=""
                    className=' w-96 aspect-square' 
                />
                <p className=' text-base font-bold text-dark-gray max-w-[40rem] text-center'>The page you’re looking for doesn’t exist. It may have been moved, deleted, or never existed in the first place.</p>
        </main>
    )
}

export default NotFound