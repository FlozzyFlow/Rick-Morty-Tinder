import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters/:id" element={<Character />} />
    </Routes>
  );
};

export default App;
