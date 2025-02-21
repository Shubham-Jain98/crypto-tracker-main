import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./components/Coinpage";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={Homepage} exact />
          <Route path="/coins" Component={Coinpage} />
          <Route path="/coins/:id" Component={Coinpage} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
