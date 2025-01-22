import { usePage } from "@inertiajs/react"
import Navigation from "../Pages/Components/Navigation"

const ProfileLayout = (props) => {

    const { auth } = usePage().props

    return (
        <>
            <main className=" bg-soft-light h-auto min-h-screen">
                <main className="">
                    <Navigation setSearch={props.setSearch} search={props.search} user={auth.user} />
                    <section className="pt-[52px]">
                        {props.children}
                    </section>
                </main>
            </main>
        </>
    )
}

export default ProfileLayout