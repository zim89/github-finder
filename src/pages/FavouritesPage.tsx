import { FC } from 'react';
import { useAppSelector } from '../hooks/redux';
import { IconTrash } from '@tabler/icons-react';
import { useActions } from '../hooks/actions';

const FavouritesPage: FC = () => {
  const { favourites } = useAppSelector((state) => state.github);
  const { removeFavourite } = useActions();

  if (favourites.length === 0)
    return <p className='pt-10 text-center text-orange-800'>No items.</p>;

  return (
    <div className='mx-auto flex h-screen w-screen justify-center pt-10'>
      <ul className='flex list-none flex-col gap-2'>
        {favourites.map((f) => (
          <li
            key={f}
            className='flex items-center justify-between space-x-6 border-b'
          >
            <a
              href={f}
              target='_blank'
              className=' inline-block py-2 transition-colors hover:text-blue-600'
            >
              {f}
            </a>
            <button
              className=' text-slate-800/80 transition-colors hover:text-red-500'
              onClick={() => removeFavourite(f)}
            >
              <IconTrash className='h-5 w-5' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
