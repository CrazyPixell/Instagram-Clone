import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import {
  useSession,
  signIn as signInHandler,
  signOut as signOutHandler,
} from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [, setOpen] = useRecoilState(modalState);

  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  };

  return (
    <header className='shadow-sm border-b bg-white sticky top-0 z-1000'>
      <div className='flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto'>
        <div
          className='relative hidden lg:inline-grid w-24 cursor-pointer'
          onClick={() => router.push('/')}
        >
          <Image
            src='https://links.papareact.com/ocw'
            layout='fill'
            objectFit='contain'
          />
        </div>

        <div
          className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer'
          onClick={() => router.push('/')}
        >
          <Image
            src='https://links.papareact.com/jjm'
            layout='fill'
            objectFit='contain'
          />
        </div>

        <div className='max-w-xs'>
          <div className='relative mt-1 p-3 rounded-md'>
            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </div>
            <input
              className='bg-gray-100 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md placeholder:text-gray-400'
              type='text'
              placeholder='Поиск'
            />
          </div>
        </div>

        <div className='relative flex items-center justify-between'>
          {session && (
            <MenuIcon
              className='h-6 md:hidden cursor-pointer mr-4 hover:scale-125 transtion-all duration-150'
              onClick={toggleMobileMenu}
            />
          )}
          {session ? (
            <>
              <div
                className={`${'flex space-x-4 mt-2 bg-white shadow-sm'} ${
                  mobileMenu
                    ? 'absolute top-12 -left-3 flex-col space-x-0 space-y-1 px-3 md:relative md:top-0 md:left: 0 md:flex-row md:space-x-4 md:mt-2 md:px-0'
                    : ''
                }`}
              >
                <HomeIcon
                  className={`${'nav-btn'} ${
                    mobileMenu ? 'nav-btn-mobile' : ''
                  }`}
                  onClick={() => router.push('/')}
                />
                <div
                  className={`${'relative nav-btn'} ${
                    mobileMenu ? 'nav-btn-mobile' : ''
                  }`}
                >
                  <PaperAirplaneIcon
                    className={`${'nav-btn rotate-45'} ${
                      mobileMenu ? 'nav-btn-mobile' : ''
                    }`}
                  />
                  <div className='absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white'>
                    3
                  </div>
                </div>
                <PlusCircleIcon
                  className={`${'nav-btn'} ${
                    mobileMenu ? 'nav-btn-mobile' : ''
                  }`}
                  onClick={() => setOpen(true)}
                />
                <UserGroupIcon
                  className={`${'nav-btn'} ${
                    mobileMenu ? 'nav-btn-mobile' : ''
                  }`}
                />
                <HeartIcon
                  className={`${'nav-btn'} ${
                    mobileMenu ? 'nav-btn-mobile' : ''
                  }`}
                />
              </div>

              <img
                onClick={signOutHandler}
                src={session?.user?.image}
                alt='avatar'
                className='h-10 rounded-full cursor-pointer ml-4 hover:scale-125 transtion-all duration-150'
              />
            </>
          ) : (
            <button onClick={signInHandler}>Войти</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
