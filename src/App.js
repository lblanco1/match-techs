import Forms from './scenes/publics/auth/pages/Forms/components/Forms_sign_up'; 
import Password from './scenes/publics/auth/pages/Forms/components/Forms_password';
import Header from "./scenes/publics/auth/pages/layouts/Header"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/cadastro" element={<Forms />} />
      </Routes>

      <Routes>
        <Route path="/password" element={<Password />} />
      </Routes>
    </>
  );
};

export default App;
