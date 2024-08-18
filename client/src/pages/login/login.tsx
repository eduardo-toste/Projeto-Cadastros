import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();

    async function autenticaLogin(event: any) {
        event.preventDefault();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !senha) {
            return toast.warning("Preencha todos os campos necessários.")
        } else if (!pattern.test(email)) {
            toast.error('Por favor, digite um e-mail válido.');
        } else {
            await axios.post(`http://localhost:8000/login/`, {
                senha,
                email
            }).then(function (resposta) {
                toast.success(resposta.data.message)
                navigate('/cadastro/cadastroEmpresa');
            }).catch(function (erro) {
                console.log(erro);
                if (erro.response.status === 404) {
                    toast.error("Não foi possível encontrar um cadastro com este e-mail");
                } else if (erro.response.status === 401) {
                    toast.error("Senha incorreta");
                } else {
                    toast.error("Erro desconhecido ao tentar realizar o login.");
                }
            });
        }

    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="col-md-4">
                    <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4" style={{ color: "#5a67d8" }}>Central do usuário</h3>
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="username" className="form-label" style={{ color: "#4a5568" }}>E-mail</label>
                                    <input type="text" className="form-control" value={email} placeholder="Insira seu e-mail" onChange={(event) => {
                                        setEmail(event.target.value);
                                    }} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password" className="form-label" style={{ color: "#4a5568" }}>Senha</label>
                                    <input type="password" className="form-control" value={senha} placeholder="Insira sua senha" onChange={(event) => {
                                        setSenha(event.target.value);
                                    }} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3" onClick={autenticaLogin} style={{ backgroundColor: "#5a67d8", borderColor: "#5a67d8", borderRadius: "8px" }}>Entrar</button>
                            </form>
                            <div className="text-center mt-4">
                                <span style={{ color: "#4a5568" }}>Não tem uma conta? </span>
                                <a href="/cadastro/cadastroUsuario" className="text-primary" style={{ color: "#5a67d8", textDecoration: "none" }}>Cadastre-se</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;