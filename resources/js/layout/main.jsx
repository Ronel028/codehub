import { usePage } from "@inertiajs/react"
import Navigation from "../Pages/Components/Navigation"

const MainLayout = (props) => {

    const { auth } = usePage().props

    return (
        <>
            <main className=" bg-gray-50 h-auto min-h-screen">
                <main className=" max-w-[1500px] w-[90%] mx-auto">
                    <Navigation user={auth.user} />
                    <section className="pt-[65px] pb-10">
                        {props.children}
                    </section>
                </main>
            </main>
        </>
    )
}

export default MainLayout