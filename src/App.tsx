import { Routes, Route } from "react-router-dom";
import { Jobs } from "./pages/Jobs"
import { NoPage } from "./pages/NoPage"
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp"
import { Home } from './pages/Home';
import NavBar from "./components/NavBar"
import useFetch from './Fetch';
import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import {auth} from "./firebase-config";

function App() {
  const [theme, setTheme] = useState(`dark:bg-slate-800 dark:text-white`);
  const data = useFetch("data.json");

  const body = document.querySelector("body") as HTMLBodyElement;
  body.className = theme.split(" ")[0];

  const ChangeTheme = (): void => {
    setTheme(theme === `dark:bg-slate-800 dark:text-white` ? `light:bg-slate-400 light:text-black` : `dark:bg-slate-800 dark:text-white`);
    body.className = theme.split(" ")[0];
  }

  console.log(auth);
  

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <main className={`min-h-screen ${theme}`}>
          <NavBar changeTheme={ChangeTheme} />
          <Routes>
            <Route path='/JobChaser/' element={<Home />} />
            <Route path='/JobChaser/Jobs' element=
              {
                data && data ? <Jobs jobs={data} /> : <NoPage />
              } />
            <Route path='/JobChaser/SignIn' element={<SignIn />} />
            <Route path='/JobChaser/Signup' element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
          </Routes>

        </main>
      </ThemeContext.Provider>
    </>
  )
}
// company, logo, position, contract, postedAt, location
// {data && data ? <JobCards {...data}></JobCards> : <p>Data loading...</p>}
//Gammal kod använde spread operator för att kunna lägga till en array direkt i props utan att göra en interface som innehåller en array

export default App
