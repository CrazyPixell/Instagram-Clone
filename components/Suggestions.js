import { useState, useEffect } from 'react';
import faker from '@faker-js/faker';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <p className='text-sm font-bold text-gray-400'>Рекомендации для вас</p>
        <button className='text-gray-600 font-semibold'>Все</button>
      </div>

      {suggestions?.map(profile => (
        <div
          className='flex items-center justify-between mt-3'
          key={profile.id}
        >
          <img
            className='w-10 h-10 rounded-full border p-[2px]'
            src={profile.avatar}
            alt={profile.username}
          />
          <div className='flex-1 ml-4 mr-2'>
            <p className='text-sm font-semibold'>{profile.username}</p>
            <p className='text-xs text-gray-400'>
              Работает в {profile.company.name}
            </p>
          </div>
          <button className='text-white bg-blue-400 p-2 rounded-sm text-xs font-bold'>
            Подписаться
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
