import { Routes, Route } from "react-router-dom";
import Jobs from "./pages/Jobs"
import NoPage from "./pages/NoPage"
import SignIn from "./pages/SignIn";
import Home from './pages/Home';
import NavBar from "./components/Navbar/NavBar"
import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { setSuggestedModalStatus } from "./slices/jobSlice";
import { useAppDispatch } from "./redux/store";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/User/ProtectedRoute";
import ProfilePage from "./pages/Profile";

export default function App() {
  //Istället för att ha hela den strängen testa att ha theme med värde dark eller light 
  //Lägg sedan exempelvis dark:bg-slate-800 dark:text-white för respektive komponent
  const [theme, setTheme] = useState(`dark:bg-slate-800 dark:text-white`);

  // dark:text-white light:text-black
  const dispatch = useAppDispatch();

  const body = document.querySelector("body") as HTMLBodyElement;
  body.className = theme.split(" ")[0];

  const ChangeTheme = (): void => {
    setTheme(theme.includes("dark") ? `bg-white` : `dark:bg-slate-800 dark:text-white`);
    body.className = theme.split(" ")[0];
  }

  const suggestedResults = (e: React.MouseEvent<HTMLDivElement>) => {
    let modalStatus: "open" | "closed";

    if (e.target instanceof HTMLInputElement && e.target.type === "text") {
      modalStatus = "open";
    } else {
      modalStatus = "closed";
    }

    dispatch(setSuggestedModalStatus(modalStatus))
  }

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <div className="min-h-screen grid grid-rows-2" onClick={e => suggestedResults(e)}>
          <NavBar changeTheme={ChangeTheme} />
          <main className={`row-start-1 row-span-2 ${theme}`}>
            <Routes>
              <Route path='/JobChaser/' element={<Home />} />
              <Route path='/JobChaser/Jobs' element={<Jobs />} />
              <Route path='/JobChaser/SignIn' element={<SignIn />} />
              <Route path='/JobChaser/SignUp' element={<SignUp />} />
              <Route path='/JobChaser/Profile' element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </>
  )
}
// company, logo, position, contract, postedAt, location
// {data && data ? <JobCards {...data}></JobCards> : <p>Data loading...</p>}
//Gammal kod använde spread operator för att kunna lägga till en array direkt i props utan att göra en interface som innehåller en array