// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Link } from '@inertiajs/react';
import AuthorLayout from '../../../layout/AuthorLayout';
import CoverOne from '../../../assets/img/cover-01.png';
import userSix from '../../../assets/img/user-06.png';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { isNull } from 'lodash';

const socialMediaIcons = {
  facebook: <FaFacebookF className=' text-xl' />,
  linkedin: <FaLinkedinIn className=' text-xl' />,
  twitter: <FaSquareXTwitter className=' text-xl' />,
  github: <FaGithub className=' text-xl' />,
}

const Profile = ({ user }) => {
  return (
    <>
      <div className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={user.cover?.path ?? CoverOne}
            alt="profile cover"
            className="aspect-[4/1] h-full w-full rounded-tl-md rounded-tr-md object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11">
          <div className="relative z-30 mx-auto -mt-24 h-30 w-full max-w-30 rounded-full bg-very-light p-1 sm:h-44 sm:max-w-44 sm:p-1">
            <div className="relative drop-shadow-2">
              <img src={user.avatar?.path ?? userSix} alt="profile" className=' rounded-full' />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-2xl font-semibold text-primary dark:text-white">
              { user.user_detail?.full_name ?? user.username }
            </h3>
            <p className="font-medium text-secondary">{ user.user_detail?.tagline ?? null }</p>
            <div className="mx-auto mt-4 mb-5 grid max-w-[450px] grid-cols-3 rounded-md border border-secondary border-stroke py-2.5 shadow-sm">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-light-gray border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-primary dark:text-white">
                  259
                </span>
                <span className="text-sm text-secondary">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-light-gray border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-primary dark:text-white">
                  129K
                </span>
                <span className="text-sm text-secondary">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-primary dark:text-white">
                  2K
                </span>
                <span className="text-sm text-secondary">Following</span>
              </div>
            </div>

            {
              !isNull(user.user_detail) ? (
                  <div className="mx-auto max-w-180">
                    <h4 className="font-bold text-primary">
                      About Me
                    </h4>
                    <p className="mt-4 text-secondary text-sm">
                      {user.user_detail.bio}
                    </p>
                  </div>
              ) : null
            }

            {
              user.social_media_links?.length > 0 ? (
                <div className="mt-6">
                <h4 className="mb-3.5 font-bold text-black dark:text-white">
                  Follow me on
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  {
                     user.social_media_links?.map(value => (
                        <a
                          key={value.id}
                          href={value.link}
                          target='_blank'
                          className="hover:text-primary text-secondary"
                          aria-label="social-icon"
                        >
                          {socialMediaIcons[value.platform]}
                        </a>
                     ))
                  }
                </div>
              </div>
              ) : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

Profile.layout = page => <AuthorLayout children={page} />

export default Profile;
