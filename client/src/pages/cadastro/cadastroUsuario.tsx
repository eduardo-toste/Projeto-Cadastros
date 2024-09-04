import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function CadastroUsuario() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [nome, setNome] = useState<string>();

    async function cadastraUsuario(event: any) {
        event.preventDefault();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
        // PATTERN PARA VERIFICAR UM NUMERO TAMBEM const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;

        if (!nome || !senha || !email) {
            return toast.info("Preencha todos os campos para cadastrar usuário");
        } else if (!pattern.test(email)) {
            toast.error("Por favor, digite um e-mail válido.");
        } else if (!patternPassword.test(senha)) {
            toast.error("Senha inválida, favor digitar um respeitando a política de senha")
        } else {
            await axios.post (`http://localhost:8000/cadastra/usuario/`, {
                nome,
                senha,
                email
            }).then(function (resposta) {
                toast.success(resposta.data.message)
                navigate('/login/');
            }).catch(function (erro) {
                console.log(erro);
                if (erro.response.status === 403 || erro.response.status === 402) {
                    // toast.error("Token vencido, faça seu login novamente")
                } else {
                    toast.error(erro);
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
                            <h3 className="card-title text-center mb-4" style={{ color: "#5a67d8" }}>Cadastro de Usuário</h3>
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="nome" className="form-label" style={{ color: "#4a5568" }}>Nome Completo</label>
                                    <input type="text" className="form-control" value={nome} placeholder="Digite seu nome Completo" onChange={(event) => {
                                        setNome(event.target.value);
                                    }} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label" style={{ color: "#4a5568" }}>E-mail</label>
                                    <input type="text" className="form-control" value={email} placeholder="Digite seu melhor e-mail" onChange={(event) => {
                                        setEmail(event.target.value);
                                    }} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="senha" className="form-label" style={{ color: "#4a5568" }}>Senha</label>
                                    <input type="password" className="form-control" value={senha} placeholder="Digite sua senha" onChange={(event) => {
                                        setSenha(event.target.value);
                                    }} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3" onClick={cadastraUsuario} style={{ backgroundColor: "#5a67d8", borderColor: "#5a67d8", borderRadius: "8px" }}>Cadastrar</button>
                                <button type="submit" className="btn btn-outline-secondary w-100 mt-2" onClick={() => navigate("/login/")}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CadastroUsuario;