import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CadastroUsuario from "./pages/cadastro/cadastroUsuario";
import CadastroEmpresa from "./pages/cadastro/cadastroEmpresa";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro/cadastroUsuario" element={<CadastroUsuario />} />
        <Route path="/cadastro/cadastroEmpresa" element={<CadastroEmpresa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
