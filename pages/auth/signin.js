import { getProviders, signIn as signInThroughProvider } from 'next-auth/react';
import Header from '../../components/Header';

const signIn = ({ providers }) => {
  const checkProviders = providers;

  return (
    <>
      <Header />

      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-20 px-14 text-center'>
        <img
          className='w-80'
          src='https://links.papareact.com/ocw'
          alt='instagram logo'
        />
        <p className='font-xs italic'>
          Приложение не настоящее. Только для персонального обучения и
          использования в портфолио
        </p>
        <div className='mt-40'>
          {checkProviders &&
            Object.values(providers).map(provider => (
              <div key={provider.name}>
                <button
                  className='p-3 bg-blue-400 rounded-lg text-white'
                  onClick={() =>
                    signInThroughProvider(provider.id, { callbackUrl: '/' })
                  }
                >
                  Войти через {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default signIn;
