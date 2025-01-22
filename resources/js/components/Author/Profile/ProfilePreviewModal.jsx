import { capitalize, isNull } from "lodash";
import altImage from "../../../assets/img/cypher.jpg";
import coverPlaceholder from "../../../assets/img/cover-placeholder.jpg";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "@inertiajs/react";

const socialMediaIcons = {
    facebook: <FaFacebookF className=" text-blue-400" />,
    linkedin: <FaLinkedinIn className=" text-blue-600" />,
    twitter: <FaSquareXTwitter className=" text-secondary" />,
    github: <FaGithub className=" text-gray-500" />,
};

const ProfilePreviewModal = ({ profilePreview: user, setProfilePreview }) => {
    console.log(user)
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
                    <form className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <div className=" flex items-center justify-between gap-2">
                                        <h3
                                            className="text-base font-semibold text-gray-900"
                                            id="modal-title"
                                        >
                                            Profile Preview
                                        </h3>
                                    </div>
                                    <div className="mt-4">
                                        <section>
                                            <div className=" h-56 w-full  rounded-t-md">
                                                <img
                                                    className=" w-full aspect-[4/1]"
                                                    src={
                                                        user?.cover ??
                                                        coverPlaceholder
                                                    }
                                                />
                                                <div className=" -mt-24 flex items-center justify-start max-w-[1500px] w-[90%] mx-auto ">
                                                    <div className=" relative overflow-hidden rounded-full">
                                                        <img
                                                            className="h-full w-36 aspect-square rounded-full border-2 border-[#1b263b]"
                                                            src={
                                                                user?.avatar ??
                                                                altImage
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" max-w-[1500px] w-[90%] mx-auto pb-8 mt-4 mb-4 ">
                                                <div className="flex items-start justify-between">
                                                    <div className=" flex gap-2 items-start">
                                                        <div className="">
                                                            <h2 className=" text-primary text-3xl font-bold tracking-wide mb-1">
                                                                {user?.fullName ??
                                                                    user?.username}
                                                            </h2>
                                                            {!isNull(
                                                                user.tagline
                                                            ) ? (
                                                                <div className=" flex flex-wrap gap-5 tracking-wide">
                                                                    <p className=" text-sm text-primary/70 tracking-wide flex gap-1">
                                                                        {
                                                                            user.tagline
                                                                        }
                                                                    </p>
                                                                </div>
                                                            ) : null}
                                                            <div className=" flex items-center flex-wrap gap-5 mt-4">
                                                                <div className=" flex flex-wrap gap-5 tracking-wide">
                                                                    {user.socialMediaLinks.length > 0 ? 
                                                                        user.socialMediaLinks.map((value) => (
                                                                                  <Link
                                                                                      key={ value.id }
                                                                                      href={value.link}
                                                                                      className="font-bold text-secondary flex items-center gap-1 text-sm hover:underline"
                                                                                  >
                                                                                      { socialMediaIcons[value.platform]}
                                                                                      {capitalize(value.platform)}
                                                                                  </Link>
                                                                              )
                                                                          )
                                                                        : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!isNull(user.bio) ? (
                                                    <div className=" mt-8">
                                                        <h2 className=" text-lg font-bold tracking-wide mb-1 text-yellow-400 capitalize">
                                                            Professional Bio
                                                        </h2>
                                                        <p className=" text-sm  text-primary/70 tracking-wide mb-4">
                                                            {user.bio}
                                                        </p>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-end items-center gap-2 sm:px-6">
                            <button
                                onClick={() => setProfilePreview(prevState => prevState = null)}
                                type="button"
                                className={`inline-flex w-full items-center justify-center rounded-md bg-primary h-9 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-opacity-75 sm:w-auto`}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePreviewModal;
