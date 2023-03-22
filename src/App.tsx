import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shows from "./components/shows/Shows"
import PageNotFound from "./pages/not-found/NotFound";
import Detail from "./pages/details/Details";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Shows />} />
          <Route path="not-found" element={<PageNotFound />} />
          <Route path="/anime/:_id" element={<Detail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App