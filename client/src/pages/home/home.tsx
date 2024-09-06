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
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1 className="text-center">CHEGOU NA HOME</h1>
            </div>
        </>
    )
}

export default Home