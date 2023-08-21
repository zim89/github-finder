import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className=' bg-slate-700 text-white shadow-md'>
      <div className='mx-auto flex h-[60px] max-w-5xl  items-center justify-between'>
        <h3 className='font-bold'>Github Search</h3>

        <span>
          <Link to='/' className='mr-4 transition-colors hover:text-orange-400'>
            Home
          </Link>
          <Link
            to='/favourites'
            className='transition-colors hover:text-orange-400'
          >
            Favourites
          </Link>
        </span>
      </div>
    </nav>
  );
};
export default Navigation;
