import { useEffect, useState } from 'react';
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import RepoCard from '../components/RepoCard';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className='mx-auto flex h-screen max-w-5xl justify-center pt-10'>
      {isError && (
        <p className='text-center text-red-600'>Something went wrong...</p>
      )}
      <div className='relative w-[560px]'>
        <input
          type='text'
          className='mb-2 h-[42px] w-full rounded-md border px-4 py-2'
          placeholder='Search for Github username...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className='absolute left-0 right-0 top-[50px] max-h-[200px] list-none overflow-y-scroll rounded-md bg-white shadow-md'>
            {isLoading && <p className='text-center'>Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className='cursor-pointer px-4 py-2 transition-colors hover:bg-gray-500 hover:text-white'
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className='container pb-10'>
          {areReposLoading && (
            <p className='text-center'>Repos are loading...</p>
          )}
          {repos?.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
