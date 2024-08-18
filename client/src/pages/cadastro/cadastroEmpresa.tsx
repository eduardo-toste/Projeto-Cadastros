import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CadastroEmpresa() {
    const navigate = useNavigate();
    const consultarCNPJ = require('consultar-cnpj')
    const [cnpj, setCnpj] = useState<string>();
    const [razaoSocial, setRazaoSocial] = useState<string>();
    const [endereco, setEndereco] = useState<string>();
    const [telefone, setTelefone] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [dados, setDados] = useState<Dado[]>([]);

    interface Dado {
        id: number;
        cnpj: string;
        razao_social: string;
        endereco: string;
        telefone: string;
        email: string;
    }

    async function buscaEmpresas() {
        axios.get(`http://localhost:8000/busca/empresas`)
            .then(function (resposta) {
                setDados(resposta.data.data)
            }).catch(function (erro) {
                toast.error(erro.response.message)
            })
    }

    useEffect(() => {
        buscaEmpresas()
    }, []);


    async function validaCNPJ() {

        try {

            const empresa = await consultarCNPJ(cnpj);

            const telefoneCompleto = empresa.estabelecimento.ddd1 && empresa.estabelecimento.telefone1
                ? `${empresa.estabelecimento.ddd1}${empresa.estabelecimento.telefone1}`
                : empresa.estabelecimento.telefone1 || '';

            const enderecoCompleto = [
                empresa.estabelecimento.logradouro || '',
                empresa.estabelecimento.numero || '',
                empresa.estabelecimento.complemento || '',
                empresa.estabelecimento.bairro || '',
                empresa.estabelecimento.cidade.nome || '',
                empresa.estabelecimento.estado.nome || '',
                empresa.estabelecimento.cep || ''
            ].filter(part => part.trim() !== '').join(', ');

            setCnpj(cnpj)
            setRazaoSocial(empresa.razao_social)
            setTelefone(telefoneCompleto)
            setEmail(empresa.estabelecimento.email)
            setEndereco(enderecoCompleto)

        } catch (e) {
            console.log(e);
        }
    }

    async function cadastraEmpresa(event: any) {
        event.preventDefault();

        if (!cnpj || !razaoSocial || !endereco || !telefone || !email) {
            return toast.info("Preencha todos os campos necessários ou verifique se o CNPJ inserido é valido");
        }

        await axios.post(`http://localhost:8000/cadastra/empresa/`, {
            cnpj,
            razaoSocial,
            endereco,
            telefone,
            email,
        }).then(function (resposta) {
            toast.success(resposta.data.message)
        }).catch(function (erro) {
            console.log(erro);
            if (erro.response.status === 403 || erro.response.status === 402) {
                // toast.error("Token vencido, faça seu login novamente")
            } else {
                toast.error(erro);
            }
        });
    }

    async function teste() {

    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="col-md-8">
                    <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-4 position-relative">
                            <button className="btn btn-sm btn-outline-secondary position-absolute"
                                style={{ top: "10px", left: "10px", borderRadius: "8px" }}
                                onClick={function () {
                                    navigate(`/login/`)
                                }}>
                                Logout
                            </button>
                            <h3 className="card-title text-center mb-4" style={{ color: "#5a67d8" }}>Cadastro de Empresas</h3>
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="cnpj" className="form-label" style={{ color: "#4a5568" }}>CNPJ</label>
                                        <input type="text" className="form-control" value={cnpj} placeholder="CNPJ da empresa" onBlur={() => validaCNPJ()} onChange={(event) => { setCnpj(event.target.value) }} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="razaoSocial" className="form-label" style={{ color: "#4a5568" }}>Razão Social</label>
                                        <input type="text" className="form-control" value={razaoSocial} placeholder="Razão social da empresa" onChange={(event) => setRazaoSocial(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label htmlFor="endereco" className="form-label" style={{ color: "#4a5568" }}>Endereço Completo</label>
                                        <input type="text" className="form-control" value={endereco} placeholder="Digite o endereço completo da empresa" onChange={(event) => setEndereco(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="telefone" className="form-label" style={{ color: "#4a5568" }}>Telefone</label>
                                        <input type="text" className="form-control" value={telefone} placeholder="Insira o telefone. Ex: (xx) xxxxx-xxxx" onChange={(event) => setTelefone(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label" style={{ color: "#4a5568" }}>E-mail</label>
                                        <input type="text" className="form-control" value={email} placeholder="Insira o e-mail para contato" onChange={(event) => setEmail(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary w-50 mt-3" onClick={cadastraEmpresa} style={{ backgroundColor: "#5a67d8", borderColor: "#5a67d8", borderRadius: "8px" }}>Cadastrar</button>
                                </div>
                            </form>
                            <div>
                                <h3 className="card-title text-center mb-4 mt-4" style={{ color: "#5a67d8" }}>Empresas Cadastradas</h3>
                                <div className="table-responsive" style={{ maxHeight: "200px", overflowY: "auto" }}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ color: "#4a5568" }}>Razão Social</th>
                                                <th style={{ color: "#4a5568" }}>CNPJ</th>
                                                <th style={{ color: "#4a5568" }}>Endereço Completo</th>
                                                <th style={{ color: "#4a5568" }}>Telefone de Contato</th>
                                                <th style={{ color: "#4a5568" }}>E-mail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dados.map(dado => (
                                                <tr key={dado.id}>
                                                    <td>{dado.razao_social}</td>
                                                    <td>{dado.cnpj}</td>
                                                    <td>{dado.endereco}</td>
                                                    <td>{dado.telefone}</td>
                                                    <td>{dado.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CadastroEmpresa