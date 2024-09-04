import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import alignJustifyFill from '@iconify-icons/mingcute/align-justify-fill';
import logo from '../../assets/logo.png';

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar bg-body-secondary">
                <div className="container-fluid">
                    <div>
                        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                            <Icon icon={alignJustifyFill} width="30" height="30" />
                        </button>
                        <a className="navbar-brand" href="/home/home">
                            <img src={logo} width="50" height="50" style={{ borderRadius: "10px" }} />
                        </a>
                    </div>
                </div>
            </nav>


            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Opções do Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <button type="submit" className="btn btn-primary w-100 mt-2" style={{ backgroundColor: "#5a67d8", borderColor: "#5a67d8", borderRadius: "8px" }} onClick={function () { navigate(`/cadastro/cadastroEmpresa`) }}>Cadastro de Empresas</button>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-sm btn-outline-secondary w-50"
                        style={{ borderRadius: "8px" }}
                        onClick={function () {
                            navigate(`/login/`)
                        }}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1 className="text-center">CHEGOU NA HOME</h1>
            </div>
        </>
    )
}

export default Home