import Navigation from "../Components/Navigation"

const MainLayout = (props) => {
    return (
        <>
            <main className=" bg-gray-50 h-auto min-h-screen">
                <main className=" max-w-[1500px] w-[90%] mx-auto">
                    <Navigation />
                    <section className="pt-[65px] pb-10">
                        {props.children}
                    </section>
                </main>
            </main>
        </>
    )
}

export default MainLayout