import { FC } from 'react';
import { useAppSelector } from '../hooks/redux';

const FavouritesPage: FC = () => {
  const { favourites } = useAppSelector((state) => state.github);

  if (favourites.length === 0)
    return <p className='text-center text-orange-800'>No items.</p>;

  return (
    <div className='mx-auto flex h-screen w-screen justify-center pt-10'>
      <ul className='flex list-none flex-col gap-2'>
        {favourites.map((f) => (
          <li key={f}>
            <a href={f} target='_blank' className=' inline-block py-2'>
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
