import AuthorLayout from "../../../layout/AuthorLayout"

const DashboardIndex = () => {
    return <p>Welcome to Dashboard</p>
}

DashboardIndex.layout = page => <AuthorLayout children={page} />

export default DashboardIndex