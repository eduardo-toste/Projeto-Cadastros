import { Icon } from "@iconify/react";
import pencilIcon from '@iconify/icons-mdi/pencil';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface ModalEditarProps {
    idEmpresa: number;
    onSave: () => void;
}

function ModalEditar({ idEmpresa, onSave }: ModalEditarProps) {
    const [cnpj, setCnpj] = useState<string>('');
    const [razaoSocial, setRazaoSocial] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    function buscaEmpresas() {
        axios.get(`http://localhost:8000/busca/empresa/selecionada/${idEmpresa}`)
            .then(function (resposta) {
                const empresa = resposta.data.data[0];
                if (empresa) {
                    setCnpj(empresa.cnpj);
                    setRazaoSocial(empresa.razao_social);
                    setEndereco(empresa.endereco);
                    setTelefone(empresa.telefone);
                    setEmail(empresa.email);
                }
            })
            .catch(function (erro) {
                toast.error(erro.response?.message || "Erro ao buscar dados da empresa.");
            });
    }

    function salvarEmpresa() {
        const dados = {
            idEmpresa,
            cnpj,
            razaoSocial,
            endereco,
            telefone,
            email
        }

        axios.put(`http://localhost:8000/edita/empresa/selecionada`, dados)
            .then(function (resposta) {
                toast.success(resposta.data.message)
                onSave(); // Chamar a função para atualizar a tabela
            }).catch(function (erro) {
                toast.error(erro.response?.message || "Erro ao salvar dados da empresa.");
            })
    }

    return (
        <>
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#modal-${idEmpresa}`} onClick={buscaEmpresas}>
                <Icon icon={pencilIcon} style={{ fontSize: '20px' }} />
            </button>

            {/* Adiciona a prop `key` ao modal para forçar atualização quando o idEmpresa mudar */}
            <div key={idEmpresa} className="modal fade" id={`modal-${idEmpresa}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: "#f1f5f9", borderBottom: "2px solid #cbd5e0" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "#4a56e2" }}>Editar empresa</h1>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="cnpj" className="form-label" style={{ color: "#4a5568" }}>CNPJ</label>
                                        <input type="text" className="form-control" value={cnpj} onChange={(event) => setCnpj(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="razaoSocial" className="form-label" style={{ color: "#4a5568" }}>Razão Social</label>
                                        <input type="text" className="form-control" value={razaoSocial} onChange={(event) => setRazaoSocial(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label htmlFor="endereco" className="form-label" style={{ color: "#4a5568" }}>Endereço Completo</label>
                                        <input type="text" className="form-control" value={endereco} onChange={(event) => setEndereco(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="telefone" className="form-label" style={{ color: "#4a5568" }}>Telefone</label>
                                        <input type="text" className="form-control" value={telefone} onChange={(event) => setTelefone(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label" style={{ color: "#4a5568" }}>E-mail</label>
                                        <input type="text" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} style={{ borderColor: "#cbd5e0", borderRadius: "8px" }} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "#f1f5f9", borderTop: "2px solid #cbd5e0" }}>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ backgroundColor: "#e2e8f0", color: "#4a5568", borderRadius: "8px" }}>Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ backgroundColor: "#4a56e2", borderRadius: "8px" }} onClick={salvarEmpresa}>Salvar mudanças</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditar;
