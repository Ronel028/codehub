import { useContext, useState } from "react"
import PostTitleCreationProvider, { PostTitleCreationContext } from "../../../context/PostCreationContext"
import AuthorLayout from "../../../layout/AuthorLayout"
import PostTitleModal from "../../../components/Author/Post/PostTitleModal"
import Button from "../../../components/Forms/Button"
import { IoCreateOutline } from "react-icons/io5"
import PostThumbnailModal from "../../../components/Author/Post/PostThumbnailModal"

const PostIndex = () => {

    const [openPostModal, setOpenPostModal] = useState(false)

    function createPost(){
        setOpenPostModal(true)
    }

    return (
        <PostTitleCreationProvider>
            { openPostModal ? <PostTitleModal close={() => setOpenPostModal(false)} /> : null }
            <PostThumbnailModal title={'Edit your Thumbnail.'} />
            <main>
                <h1 className=" text-primary font-bold text-2xl mb-6">
                    All post
                </h1>
                <div>
                    <Button onClick={createPost} title={'Create New'} icon={<IoCreateOutline className="text-lg" />} />
                </div>
                <div>
                    <section></section>
                </div>
            </main>
        </PostTitleCreationProvider>
    )
}

PostIndex.layout = page => <AuthorLayout children={page} />

export default PostIndex