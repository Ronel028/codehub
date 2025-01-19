// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Link } from '@inertiajs/react';
import AuthorLayout from '../../../layout/AuthorLayout';
import CoverOne from '../../../assets/img/cover-01.png';
import userSix from '../../../assets/img/user-06.png';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";

const Profile = ({ user }) => {
  return (
    <>
      <div className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={user.cover?.path ?? CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-md rounded-tr-md object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11">
          <div className="relative z-30 mx-auto -mt-24 h-30 w-full max-w-30 rounded-full bg-light/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
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

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-primary dark:text-white">
                About Me
              </h4>
              <p className="mt-4 text-secondary text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                pharetra ligula sed, aliquam lacus.
              </p>
            </div>

            <div className="mt-6">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link
                  href="#"
                  className="hover:text-primary text-secondary"
                  aria-label="social-icon"
                >
                  <FaFacebookF className=' text-xl' />
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary text-secondary"
                  aria-label="social-icon"
                >
                 <FaSquareXTwitter className=' text-xl' />
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary text-secondary"
                  aria-label="social-icon"
                >
                  <FaLinkedinIn className=' text-xl' />
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary text-secondary"
                  aria-label="social-icon"
                >
                  <FaGithub className=' text-xl' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Profile.layout = page => <AuthorLayout children={page} />

export default Profile;
