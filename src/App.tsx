import { Routes, Route } from "react-router-dom";
import Jobs from "./pages/Jobs"
import NoPage from "./pages/NoPage"
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from './pages/Home';
import NavBar from "./components/NavBar"
import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {

  //Istället för att ha hela den strängen testa att ha theme med värde dark eller light 
  //Lägg sedan exempelvis dark:bg-slate-800 dark:text-white för respektive komponent
  const [theme, setTheme] = useState(`dark:bg-slate-800 dark:text-white`);
  // const data = useFetch("data.json");

  // dark:text-white light:text-black

  const body = document.querySelector("body") as HTMLBodyElement;
  body.className = theme.split(" ")[0];

  const ChangeTheme = (): void => {
    setTheme(theme.includes("dark") ? `` : `dark:bg-slate-800 dark:text-white`);
    body.className = theme.split(" ")[0];
  }

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <NavBar changeTheme={ChangeTheme} />
        <main className={`min-h-screen min-w-screen ${theme}`}>
          <Routes>
            <Route path='/JobChaser/' element={<Home />} />
            <Route path='/JobChaser/Jobs' element={<Jobs />} />
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
