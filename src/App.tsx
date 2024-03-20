import { Routes, Route, Navigate } from "react-router-dom";
import { Jobs } from "./pages/Jobs"
import { NoPage } from "./pages/NoPage"
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp"
import { Home } from './pages/Home';
import NavBar from "./components/NavBar"
import useFetch from './Fetch';

function App() {

  const data = useFetch("data.json");

  return (
    <>
      <main className='h-full'>
        <NavBar />
        <Routes>
          <Route path='/JobChaser/' element={<Home />} />
          <Route path='/JobChaser/Jobs' element=
            {
              data && data ? <Jobs jobs={data} /> : <Navigate to="/JobChaser/NoPage" replace />
            } />
          <Route path='/JobChaser/SignIn' element={<SignIn />} />
          <Route path='/JobChaser/Signup' element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>
    </>
  )
}
// company, logo, position, contract, postedAt, location
// {data && data ? <JobCards {...data}></JobCards> : <p>Data loading...</p>}
//Gammal kod använde spread operator för att kunna lägga till en array direkt i props utan att göra en interface som innehåller en array

export default App
