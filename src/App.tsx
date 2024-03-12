import { useState } from 'react';
import Menu from './compontents/Menu';
import JobCards from './compontents/Jobcards';
import useFetch from './fetch';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const data = useFetch("data.json");

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const filteredJobs = data.filter((job) => job.company.toLowerCase().includes(input.toLowerCase()));

  return (
    <>
      <main className='h-full'>
        <Menu onSearch={search} input={input} />
        {
          <ul className='flex flex-col gap-4 mt-10'>
            {data && data ? <JobCards jobs={filteredJobs} /> : <p>Data loading...</p>}
          </ul>
        }
      </main>
    </>
  )
}
// company, logo, position, contract, postedAt, location
//Gammal kod använde spread operator för att kunna lägga till en array direkt i props utan att göra en interface som innehåller en array
// {data && data ? <JobCards {...data}></JobCards> : <p>Data loading...</p>}

export default App
