import Menu from './compontents/Menu';
import JobCard from './compontents/Jobcard';
import useFetch from './fetch';
import './App.css';

function App() {
  const [data] = useFetch("src/data.json")
  if (!data) return;
  console.log(data);

  return (
    <>
      <main className='h-full'>
        <Menu></Menu>
        <ul className='flex flex-col gap-4 mt-10'>
          <JobCard></JobCard>
        </ul>
      </main>
    </>
  )
}
// company, logo, position, contract, postedAt, location
export default App
