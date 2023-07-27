import Forms from './scenes/publics/auth/pages/Forms/components/Forms_sign_up'; 
import SignInPage from './scenes/publics/auth/pages/sign-in/SignInPage'
import Password from './scenes/publics/auth/pages/Forms/components/Forms_password';
import Header from "./scenes/publics/auth/pages/layouts/Header"
import Manutention from "./scenes/publics/users/manutention/Manutention"
import { Route, Routes } from "react-router-dom";
import Reset from './scenes/publics/auth/pages/Forms/components/Reset';
import New from './scenes/publics/auth/pages/Forms/components/New_password';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/manutencao" element={<Manutention />} />
        <Route path="/cadastro" element={<Forms />} />
        <Route path="/password" element={<Password />} />
        <Route path="/reset_password" element={<Reset />} />
        <Route path="/new_password" element={<New />} />
      </Routes>
    </>
  );
};

export default App;
