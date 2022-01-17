import { useSession, signOut as signOutHandler } from 'next-auth/react';

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img
        className='rounded-full border p-[2px] w-16 h-16 object-contain'
        src={session?.user?.image}
        alt='profile'
      />
      <div className='flex-1 mx-4'>
        <p className='font-bold'>{session?.user?.username}</p>
        <p className='text-sm text-gray-400'>Добро пожаловать в Instagram</p>
      </div>

      <button
        onClick={signOutHandler}
        className='text-blue-300 text-sm font-semibold'
      >
        Выйти
      </button>
    </div>
  );
};

export default MiniProfile;
