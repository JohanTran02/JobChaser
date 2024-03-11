import Menu from './compontents/Menu';
import JobCards from './compontents/Jobcards';
import useFetch from './fetch';
import './App.css';

function App() {
  const { data } = useFetch("data.json");

  return (
    <>
      <main className='h-full'>
        <Menu></Menu>
        {
          <ul className='flex flex-col gap-4 mt-10'>
            {data && data ? <JobCards jobs={data}></JobCards> : <p>Data loading...</p>}
          </ul>
        }
      </main>
    </>
  )
}
// company, logo, position, contract, postedAt, location
export default App
