import React, { useState } from 'react';
import { IRepo } from '../types/types';
import { useAppSelector } from '../hooks/redux';
import { useActions } from '../hooks/actions';

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { favourites } = useAppSelector((state) => state.github);
  const { addFavourite, removeFavourite } = useActions();
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavourite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className='mb-2 rounded border px-5 py-3 transition-all hover:bg-gray-100 hover:shadow-md'>
      <a
        href={repo.html_url}
        target='_blank'
        className='flex items-center justify-between'
      >
        <div className=' w-3/5'>
          <h2 className='text-lg font-bold'>{repo.full_name}</h2>
          <p className='text-sm'>
            Forks: <span className='mr-2 font-bold'>{repo.forks}</span>
            Watchers: <span className='font-bold'>{repo.watchers}</span>
          </p>
          <p className='text-sm font-thin'>{repo?.description}</p>
        </div>

        {!isFav && (
          <button
            className='rounded bg-orange-400 px-4 py-1 text-sm transition-all hover:shadow-md'
            onClick={addToFavourite}
          >
            Add
          </button>
        )}

        {isFav && (
          <button
            className='rounded bg-red-500 px-4 py-1 text-sm transition-all hover:shadow-md'
            onClick={removeFromFavourite}
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
