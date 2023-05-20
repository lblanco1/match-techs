import Forms from './scenes/publics/auth/pages/Forms/components/Forms_sign_up'; 
import Header from "./scenes/publics/auth/pages/layouts/Header"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/cadastro" element={<Forms />} />
      </Routes>
    </>
  );
};

export default App;
