import { useState, useEffect } from "react";
import { useForm, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import { capitalize, isNull } from "lodash";
import AuthorLayout from "../../../layout/AuthorLayout";
import Input from "../../../components/Forms/Input";
import ChangePhotoModal from "../../../components/Author/Profile/ChangePhotoModal";
import ProfilePreviewModal from "../../../components/Author/Profile/ProfilePreviewModal";
import { MdAddPhotoAlternate, MdAdd } from "react-icons/md";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaRegEdit,
    FaSave,
    FaTrashAlt,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import coverPlaceholder from "../../../assets/img/cover-placeholder.jpg";
import profilePlaceholder from "../../../assets/img/cypher.jpg";

const socialMediaIcons = {
    facebook: <FaFacebookF className=" text-xl text-primary" />,
    linkedin: <FaLinkedinIn className=" text-xl text-primary" />,
    twitter: <FaSquareXTwitter className=" text-xl text-primary" />,
    github: <FaGithub className=" text-xl text-primary" />,
};

const EditProfile = (props) => {
    const { socialMediaLinks, userDetail, userAvatar, userCoverPhoto, auth } =
        props;
    const [errors, setError] = useState(null);
    const [showAddSocialMediaModal, setShowAddSocialMediaModal] =
        useState(false);
    const [socialMediaLinkId, setSocialMediaLinkId] = useState({
        id: null,
        link: "",
    });
    const [processing, setProcessing] = useState(false);
    const [personalInformationData, setPersonalInformationData] = useState({
        fullname: "",
        tagline: "",
        address: "",
        bio: "",
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);

    /* ============== SOCIAL MEDIA LINKS FUNCTIOS =============== */
    function addSocialMedia(name) {
        if (name === "show") {
            setShowAddSocialMediaModal(true);
        } else {
            setShowAddSocialMediaModal(false);
        }
    }
    function editSocialMediaLink(id, link) {
        setError(null);
        setSocialMediaLinkId({
            ...socialMediaLinkId,
            id: id,
            link: link,
        });
    }
    function updateLinkValue(e) {
        const name = e.target.name;
        setSocialMediaLinkId({
            ...socialMediaLinkId,
            link: e.target.value,
        });
    }
    function saveUpdatedSocialMediaLink() {
        router.post(
            `/author/profile/edit/social-media-account/update`,
            socialMediaLinkId,
            {
                onSuccess: () => {
                    setSocialMediaLinkId({
                        ...socialMediaLinkId,
                        id: null,
                        link: "",
                    });
                    setError(null);
                    setProcessing(false);
                },
                onError: (error) => {
                    setError(error);
                    setProcessing(false);
                },
                onProgress: () => {
                    console.log("running");
                    setProcessing(true);
                },
            }
        );
    }
    function removeSocialMediaLink(id) {
        router.delete(
            `/author/profile/edit/social-media-account/remove/${id}`,
            {
                onSuccess: () => {
                    setProcessing(false);
                },
                onError: () => {
                    setProcessing(false);
                },
                onProgress: () => {
                    setProcessing(true);
                },
            }
        );
    }
    /* ============== SOCIAL MEDIA LINKS FUNCTIOS =============== */

    /* ============== PERSONAL INFORMATION FUNCTIOS =============== */
    function onChangeGetPeronalInformation(e) {
        setPersonalInformationData({
            ...personalInformationData,
            [e.target.name]: e.target.value,
        });
    }
    function savePersonalInformation() {
        router.post(
            "/author/profile/edit/personal-information/save",
            personalInformationData,
            {
                onSuccess: () => {
                    console.log("Personal Information Saved.");
                    setError(null);
                    setProcessing(false);
                },
                onError: (error) => {
                    setError(error);
                    setProcessing(false);
                },
                onProgress: () => {
                    setProcessing(true);
                },
            }
        );
    }
    /* ============== PERSONAL INFORMATIONS FUNCTIOS =============== */

    /* ============== PROFILE AND COVER PHOTO FUNCTIOS =============== */
    function handleOnChangeGetProfilePhoto(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            const inputFieldNameAttr = e.target.name;

            if (image.size > 1000000) {
                toast.error(
                    "File size exceed the maximum limit for 1mb, Please try upload another image.",
                    {
                        position: "top-right",
                        autoClose: 10000,
                    }
                );
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                if (inputFieldNameAttr === "profile__photo") {
                    setProfilePhoto(e.target.result);
                } else {
                    console.log("cover photo");
                    setCoverPhoto(e.target.result);
                }
            };
            reader.readAsDataURL(image);
            e.target.value = "";
        }
    }
    /* ============== PROFILE AND COVER PHOTO FUNCTIOS =============== */

    /* ============== PROFILE PREVIEW PHOTO FUNCTIOS =============== */
    function showProfilePreview() {
        setProfilePreview({
            avatar: userAvatar?.path ?? null,
            cover: userCoverPhoto?.path ?? null,
            username: auth.user.username,
            fullName: userDetail?.full_name ?? null,
            tagline: userDetail?.tagline ?? null,
            bio: userDetail?.bio ?? null,
            socialMediaLinks: socialMediaLinks,
        });
    }
    /* ============== PROFILE PREVIEW PHOTO FUNCTIOS =============== */

    /* ============== REACT useEffect() FUNCTIONS ================ */
    useEffect(() => {
        if (!isNull(userDetail)) {
            setPersonalInformationData({
                ...personalInformationData,
                fullname: userDetail.full_name ?? "",
                tagline: userDetail.tagline ?? "",
                address: userDetail.address ?? "",
                bio: userDetail.bio ?? "",
            });
        }
    }, [userDetail]);
    /* ============== REACT useEffect() FUNCTIONS ================ */

    return (
        <>
            {isNull(profilePhoto) ? null : (
                <ChangePhotoModal
                    photo={profilePhoto}
                    setPhoto={setProfilePhoto}
                    type="avatar"
                    aspectRatio={1 / 1}
                    title={"Change Profile"}
                />
            )}
            {isNull(coverPhoto) ? null : (
                <ChangePhotoModal
                    photo={coverPhoto}
                    setPhoto={setCoverPhoto}
                    type="cover"
                    aspectRatio={4 / 1}
                    title={"Change Cover"}
                />
            )}
            {isNull(profilePreview) ? null : (
                <ProfilePreviewModal profilePreview={profilePreview} setProfilePreview={setProfilePreview} />
            )}
            <div className="mx-auto max-w-270">
                <div className=" flex items-center gap-3">
                    <h1 className=" text-primary font-bold text-2xl mb-2">
                        Edit Profile
                    </h1>
                    <button
                        onClick={showProfilePreview}
                        className=" text-blue-500 text-sm flex items-center hover:underline"
                    >
                        Preview
                        <HiOutlineArrowTrendingUp />
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {/* ================ LEFT SIDE =============== */}
                    <div className=" col-span-3">
                        <div className=" bg-gray-200/80 rounded-md mb-3">
                            <div className=" relative">
                                <img
                                    src={
                                        isNull(userCoverPhoto)
                                            ? coverPlaceholder
                                            : userCoverPhoto.path
                                    }
                                    alt=""
                                    className="w-full aspect-[4/1] rounded-t-md"
                                />
                                <label
                                    htmlFor="cover__photo"
                                    className="absolute top-3 right-3 flex items-center justify-center w-7 aspect-square text-primary border bg-gray-400 cursor-pointer rounded-full"
                                >
                                    <MdAddPhotoAlternate className=" text-lg" />
                                </label>
                                <input
                                    onChange={handleOnChangeGetProfilePhoto}
                                    type="file"
                                    name="cover__photo"
                                    id="cover__photo"
                                    hidden
                                />
                            </div>
                            <div className=" -mt-12 px-4 relative">
                                <img
                                    src={
                                        isNull(userAvatar)
                                            ? profilePlaceholder
                                            : userAvatar.path
                                    }
                                    alt=""
                                    className=" w-20 aspect-square rounded-full border-2 border-gray-200"
                                />
                            </div>
                            <div className=" px-3 pb-4 mt-2">
                                <p className=" text-primary font-bold">
                                    Your photo
                                </p>
                                <p className=" text-secondary text-xs">
                                    This will be displayed in your profile
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <label
                                        htmlFor="profile__photo"
                                        className="cursor-pointer text-primary text-sm border border-gray-400 px-2 py-1 rounded-md"
                                    >
                                        Upload new
                                    </label>
                                    <input
                                        onChange={handleOnChangeGetProfilePhoto}
                                        type="file"
                                        name="profile__photo"
                                        id="profile__photo"
                                        hidden
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" bg-gray-200/80 rounded-md px-3 py-3">
                            <p className=" text-primary text-lg font-bold">
                                Personal Information
                            </p>
                            <div className="mt-4 flex flex-col gap-5">
                                <Input
                                    onChange={onChangeGetPeronalInformation}
                                    value={personalInformationData.fullname}
                                    error={errors?.fullname}
                                    name="fullname"
                                    label="Full name"
                                    placeholder="Enter your full here"
                                />
                                <Input
                                    onChange={onChangeGetPeronalInformation}
                                    value={personalInformationData.tagline}
                                    error={errors?.tagline}
                                    name="tagline"
                                    label="Tagline"
                                    placeholder="Describe yourself in one line"
                                />
                                <Input
                                    onChange={onChangeGetPeronalInformation}
                                    value={personalInformationData.address}
                                    name="address"
                                    label="Address(Optional)"
                                    placeholder="Add your current location"
                                />
                                <div>
                                    <label
                                        htmlFor="bio"
                                        className="  block text-sm text-primary tracking-wide"
                                    >
                                        Bio
                                    </label>
                                    <div className="">
                                        <textarea
                                            onChange={
                                                onChangeGetPeronalInformation
                                            }
                                            value={personalInformationData.bio}
                                            name="bio"
                                            id="bio"
                                            rows={6}
                                            placeholder="Share your story..."
                                            className={`w-full border ${
                                                errors?.bio
                                                    ? "border-red-500 focus:outline-red-500"
                                                    : "border-light-gray focus:outline-[#778DA9]"
                                            } bg-white outline-none p-2 text-xs placeholder:text-light-gray text-primary rounded-md`}
                                        ></textarea>
                                        {errors?.bio && (
                                            <p className=" text-xs text-red-500 ">
                                                {errors?.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        onClick={savePersonalInformation}
                                        disabled={processing}
                                        className=" text-very-light text-sm border border-primary bg-primary px-2 py-1 rounded-md"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ================ LEFT SIDE =============== */}

                    {/* ================ RIGHT SIDE =============== */}
                    <div className="col-span-2">
                        <div className=" bg-gray-200/80 rounded-md px-3 py-3">
                            <p className=" text-primary text-lg font-bold font-nunito-sans">
                                Social Media Accounts
                            </p>
                            <div className="mt-2 flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    {socialMediaLinks.map((value) => {
                                        return (
                                            <div
                                                key={value.id}
                                                className=" flex items-center gap-2"
                                            >
                                                <div className="p-2 bg-very-light rounded-md">
                                                    {
                                                        socialMediaIcons[
                                                            value.platform
                                                        ]
                                                    }
                                                </div>
                                                <div className=" flex-grow p-2 bg-very-light rounded-md flex items-center justify-between gap-3">
                                                    {socialMediaLinkId.id ===
                                                    value.id ? (
                                                        <Input
                                                            onChange={
                                                                updateLinkValue
                                                            }
                                                            value={
                                                                socialMediaLinkId.link
                                                            }
                                                            error={errors?.link}
                                                            name={`social_link_${value.id}`}
                                                            className="w-full"
                                                        />
                                                    ) : (
                                                        <a
                                                            href={value.link}
                                                            target="_blank"
                                                            className="text-sm text-blue-500 font-bold hover:underline"
                                                        >
                                                            {value.link}
                                                        </a>
                                                    )}
                                                    <div className=" flex items-center gap-2">
                                                        {socialMediaLinkId.id ===
                                                        value.id ? (
                                                            <button
                                                                onClick={
                                                                    saveUpdatedSocialMediaLink
                                                                }
                                                                disabled={
                                                                    processing
                                                                }
                                                                title="Save"
                                                                className=" text-green-500"
                                                            >
                                                                <FaSave />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    editSocialMediaLink(
                                                                        value.id,
                                                                        value.link
                                                                    )
                                                                }
                                                                title="Edit"
                                                                className=" text-blue-500"
                                                            >
                                                                <FaRegEdit />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() =>
                                                                removeSocialMediaLink(
                                                                    value.id
                                                                )
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                            title="Remove"
                                                            className=" text-red-500"
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => addSocialMedia("show")}
                                    className=" flex items-center justify-center text-primary font-medium text-sm border border-gray-300 bg-very-light px-3 py-2 rounded-md"
                                >
                                    <MdAdd className=" text-lg" />
                                    {socialMediaLinks.length >= 1
                                        ? "Add More"
                                        : "Add"}
                                </button>
                            </div>
                        </div>
                        {showAddSocialMediaModal ? (
                            <SocialMediaAccountModal
                                addSocialMedia={addSocialMedia}
                                socialMediaLinks={socialMediaLinks}
                            />
                        ) : null}
                    </div>
                    {/* ================ RIGHT SIDE =============== */}
                </div>
            </div>
        </>
    );
};

const SocialMediaAccountModal = ({ addSocialMedia, socialMediaLinks }) => {
    const { data, setData, post, processing, errors } = useForm({
        platform: "",
        link: "",
    });

    function handleOnChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    function save(e) {
        e.preventDefault();
        post("/author/profile/edit/social-media-account", {
            onSuccess: () => addSocialMedia("close"),
        });
    }

    function platformOptions() {
        const platform = {
            facebook: "facebook",
            github: "github",
            linkedin: "linkedin",
            twitter: "twitter",
        };

        const availablePlatforms = Object.entries(platform).filter(([key]) => {
            return !socialMediaLinks.some((link) => link.platform === key);
        });

        return availablePlatforms.map(([key, value]) => (
            <option key={key} value={key}>
                {capitalize(value)}
            </option>
        ));
    }

    return (
        <div
            className="relative z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-gray-500/75 transition-opacity"
                aria-hidden="true"
            ></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                    <form
                        onSubmit={save}
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h3
                                        className="text-base font-semibold text-gray-900"
                                        id="modal-title"
                                    >
                                        Social Media Account
                                    </h3>
                                    <div className="mt-4">
                                        <div className="">
                                            <label
                                                htmlFor="platform"
                                                className="text-primary text-sm"
                                            >
                                                Platform
                                            </label>
                                            <div>
                                                <select
                                                    onChange={handleOnChange}
                                                    value={data.platform}
                                                    name="platform"
                                                    id="platform"
                                                    className={`${
                                                        errors.platform &&
                                                        "focus:outline-red-500 border-red-500"
                                                    } w-full border border-light-gray focus:outline-[#778DA9] bg-white outline-none p-2 text-xs placeholder:text-light-gray text-primary rounded-md`}
                                                >
                                                    <option value="" disabled>
                                                        ---Select Platform---
                                                    </option>
                                                    {platformOptions()}
                                                </select>
                                                {errors.platform && (
                                                    <div className="mt-2 text-xs text-red-500">
                                                        {errors.platform}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {data.platform.length > 0 ? (
                                            <div className="mt-3">
                                                <Input
                                                    onChange={handleOnChange}
                                                    value={data.link}
                                                    error={errors.link}
                                                    required
                                                    name="link"
                                                    label="Link"
                                                    placeholder="Enter your link..."
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <button
                                onClick={() => addSocialMedia("close")}
                                type="button"
                                className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                            >
                                Close
                            </button>
                            <button
                                onClick={save}
                                disabled={processing}
                                type="button"
                                className={`inline-flex w-full items-center justify-center rounded-md bg-primary h-9 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-opacity-75 sm:w-auto`}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

EditProfile.layout = (page) => <AuthorLayout children={page} />;

export default EditProfile;
