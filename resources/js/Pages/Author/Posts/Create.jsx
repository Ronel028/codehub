import AuthorLayout from "../../../layout/AuthorLayout"

const CreatePost = () => {
    return (
        <h1>Create new post</h1>
    )
}

CreatePost.layout = page => <AuthorLayout children={page} />

export default CreatePost