import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { FaBuilding } from 'react-icons/fa';
import trashIcon from '@iconify/icons-mdi/trash';
import pencilIcon from '@iconify/icons-mdi/pencil'
import React from 'react';
import ModalEditar from "../../components/modal/modalEditarEmpresa";



function CadastroEmpresa() {
    const navigate = useNavigate();
    const consultarCNPJ = require('consultar-cnpj')
    const [cnpj, setCnpj] = useState<string>();
    const [razaoSocial, setRazaoSocial] = useState<string>();
    const [endereco, setEndereco] = useState<string>();
    const [telefone, setTelefone] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [dados, setDados] = useState<Dado[]>([]);
    const [idExcluido, setIdexcluido] = useState<string>();

    interface Dado {
        id: number;
        cnpj: string;
        razao_social: string;
        endereco: string;
        telefone: string;
        email: string;
    }

    const exportToExcel = async function (event: any) {
        event.preventDefault();

        // Criar uma nova instância do Workbook
        const workbook = new ExcelJS.Workbook();

        // Adicionar uma nova planilha
        const worksheet = workbook.addWorksheet('Sheet1');

        // Adicionar cabeçalhos de coluna
        const headers = ['Razão Social', 'CNPJ', 'Endereço', 'Telefone', 'Email'];
        worksheet.addRow(headers);

        // Adicionar dados à planilha usando map
        dados.map(dado => {
            const row = [
                dado.razao_social,
                dado.cnpj,
                dado.endereco,
                dado.telefone,
                dado.email
            ];
            worksheet.addRow(row);
        });

        // Gerar o arquivo
        const buffer = await workbook.xlsx.writeBuffer();

        // Salvar o arquivo
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(blob, 'Cadastro_Empresas.xlsx');
    }

    async function buscaEmpresas() {
        axios.get(`http://localhost:8000/busca/empresas`)
            .then(function (resposta) {
                setDados(resposta.data.data)
            }).catch(function (erro) {
                console.log(erro)
                toast.error(erro.response.message)
            })
    }

    useEffect(() => {
        buscaEmpresas()
    }, []);


    const atualizarAlteracoes = () => {
        buscaEmpresas();
    };

    async function excluiEmpresa(id: string) {

        const idExcluido = id

        await axios.delete(`http://localhost:8000/exclui/empresa/${idExcluido}`)
            .then(function (resposta) {
                toast.success(resposta.data.message)
                setIdexcluido('')
                buscaEmpresas()
            }).catch(function (erro) {
                console.log(erro);
                if (erro.response.status === 403 || erro.response.status === 402) {
                    // toast.error("Token vencido, faça seu login novamente")
                } else {
                    toast.error(erro.response.data);
                }
            })
    }


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
            buscaEmpresas()
            setCnpj('')
            setRazaoSocial('')
            setTelefone('')
            setEmail('')
            setEndereco('')
        }).catch(function (erro) {
            console.log(erro);
            if (erro.response.status === 403 || erro.response.status === 402) {
                // toast.error("Token vencido, faça seu login novamente")
            } else {
                toast.error(erro);
            }
        });
    }

    return (
        <>

            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-4 position-relative">
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
                                    <button type="submit" className="btn btn-primary w-25 mt-3" onClick={cadastraEmpresa} style={{ backgroundColor: "#5a67d8", borderColor: "#5a67d8", borderRadius: "8px" }}>Cadastrar</button>
                                    <button type="button" className="btn btn-success w-25 mt-3" onClick={exportToExcel} style={{ borderRadius: "8px", marginLeft: "10px" }}>Exportar para Excel</button>
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
                                                <th style={{ color: "#4a5568" }}>Ações</th>
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
                                                    <td>
                                                        <div className="d-flex">
                                                            <ModalEditar idEmpresa={dado.id} onSave={atualizarAlteracoes} />
                                                            <button type="button" className="btn" onClick={() => excluiEmpresa(`${dado.id}`)}>
                                                                <Icon icon={trashIcon} style={{ fontSize: '20px' }} />
                                                            </button>
                                                        </div>
                                                    </td>
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