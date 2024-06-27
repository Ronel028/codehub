import { usePage } from "@inertiajs/react"
import Navigation from "../Pages/Components/Navigation"

const MainLayout = (props) => {

    const { auth } = usePage().props

    return (
        <>
            <main className=" bg-[#1b263b] h-auto min-h-screen">
                <main className=" max-w-[1500px] w-[90%] mx-auto">
                    <Navigation setSearch={props.setSearch} search={props.search} user={auth.user} />
                    <section className="pt-[65px]">
                        {props.children}
                    </section>
                </main>
            </main>
        </>
    )
}

export default MainLayout