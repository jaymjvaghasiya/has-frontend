import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { Helmet } from 'react-helmet';

export const Sidebar = () => {

    const navigate = useNavigate();

    let role = localStorage.getItem('role');

    // var path = window.location.pathname;
    let [path, setpath] = useState("/")
    useEffect(() => {



    }, [path])

    const logoutUser = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        window.location.href = '/';
    }

    console.log(path);

    const doctorLinks = [
        { name: 'Doctor', link: '/doctor/dashboard', icon: 'fa-solid fa-user-doctor' },
    ]

    const patientLinks = [
        { name: 'Patient', link: '/patient/dashboard' },
        { name: 'Book Appointment', link: '/patient/appointment' },
    ]

    const receptionistLinks = [
        { name: 'Receptionist', link: '/receptionist/dashboard' },
        { name: 'Registration Form', link: '/receptionist/registrationform' },
    ]

    const adminLinks = [
        { name: 'Admin', link: '/admin/dashboard' },
        { name: 'Add Role', link: '/admin/addrole' },
        { name: 'Add Doctor', link: '/admin/addDoctor' },
        { name: 'Add Patient', link: '/receptionist/registrationform' },
        { name: 'Add Employee', link: '/admin/addEmployee' },
    ]

    return (
        <>
            <Helmet>

                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
                <link href="../../assets/css/bootstrap.min.css" rel="stylesheet" />
                <link href="../../assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
                <link href="../../assets/css/demo.css" rel="stylesheet" />
                <link href="../../assets/css/style.css" rel="stylesheet" />
            </Helmet>
            <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <a href="" className="simple-text">
                            Dashboard
                        </a>
                    </div>
                    <ul className="nav">
                        {
                            role == 'doctor'
                                ? doctorLinks.map((doc) => {
                                    return (
                                        <li>
                                            <Link className="nav-link" to={doc.link}>
                                                <p>{doc.name}</p>
                                            </Link>
                                        </li>
                                    )
                                })
                                : role == 'employee'
                                    ? receptionistLinks.map((rec) => {
                                        return (
                                            <li>
                                                <Link className="nav-link" to={rec.link}>
                                                    <p>{rec.name}</p>
                                                </Link>
                                            </li>
                                        )
                                    })
                                    : role == 'admin'
                                        ? adminLinks.map((admin) => {
                                            return (
                                                <li>
                                                    <Link className="nav-link" to={admin.link}>
                                                        <p>{admin.name}</p>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                        : role == 'patient'
                                            ? patientLinks.map((pat) => {
                                                return (
                                                    <li>
                                                        <Link className="nav-link" to={pat.link}>
                                                            <p>{pat.name}</p>
                                                        </Link>
                                                    </li>
                                                )
                                            }) : null
                        }
                        <li>
                            <Link className="nav-link" onClick={() => logoutUser()} >
                                <p>Log out</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div
                    className="sidebar-background"
                    style={{ backgroundImage: "url(../assets/img/sidebar-5.jpg)" }}
                />
            </div>
        </>
    )
}
