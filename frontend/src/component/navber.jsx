import React, { useState, useEffect, createContext, useContext } from 'react'
import naber from './navber.css'
import axios from 'axios';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Link, NavLink } from "react-router-dom";
import { Button, Modal, Input, Select, Space, Alert } from 'antd';
const { Search } = Input;

export default function navber() {
    const [openmenu, setOpenmenu] = useState(false)
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [id, setID] = useState('');
    const [lastname, setLastame] = useState('');
    const [update_, setUpdate_] = useState(false);
    const [count, setCount] = useState(0);
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.post(import.meta.env.VITE_API_KEY_AUTHEN, {
        }, {
            headers: {
                'Authorization': ' Bearer ' + token
            }
        }).then(function (response) {
            if (response.data.status != 'Sucess') {
                window.location.assign("/login")
                localStorage.clear()
            }
            if (response.data.status == 'Sucess') {
                axios.post(import.meta.env.VITE_API_KEY_USERS, { email: response.data.decoded.email }).then(function (res) {
                    setName(res.data.message[0].fname)
                    setLastame(res.data.message[0].lname)
                    setID(res.data.message[0].id)
                    // showdataname(res.data.message[0].fname)
                })

                return;
            }


        })
            .catch(function (error) {
                console.log(error)
            });

    }, [count])
    const Logout = () => {
        setOpen(true);
    };
    const con_firm = () => {
        localStorage.removeItem('token');
        window.location.assign("/login")
    };
    const handleClose = () => {
        setOpen(false);
    };
    const menu = () => {
        setOpenmenu(prev => !prev)
    }
    const Update = () => {
        const namechange = document.getElementById('name').value
        const lastnamechange = document.getElementById('lastname').value
        if (namechange == '' || lastnamechange == '') {



        }
        if (namechange != '' && lastnamechange != '') {
            axios.put(import.meta.env.VITE_API_KEY_UPDATE, {
                id: id,
                fname: namechange,
                lname: lastnamechange,
            })
                .then((response) => {
                    console.log(response.data);
                    setUpdate_(false)
                    setCount(count + 1)
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
    return (

        <div style={{ display: "flex", width: "100%", background: '#DFD7BF', height: "50px", position: "fixed" }} className='body-nav'>
            <div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "center", }} className='text-nav'  >
                <div style={{ display: "flex" }} >
                    <span style={{ marginLeft: "10px", display: "flex", alignItems: 'center', marginRight: '10px' }}  > Hi :   &nbsp; </span><p style={{ color: "#068FFF", cursor: 'pointer' }} id='fname' onClick={() => setUpdate_(prev => !prev)}> {name} {lastname} </p>
                </div>
            </div>
            <div style={{ textAlign: "center", width: "60%", height: "50px", alignItems: "center", display: "flex", marginLeft: "20px" }}>
                <Link to={`/home`} href='/home' className='button button1' style={{ width: "100px", border: "none", height: "90%", cursor: "pointer", marginRight: "10px" }}>
                    <span style={{ alignItems: "center" }}>
                        Home
                    </span>
                </Link>

                <Link to={`/about`} className='button button1' style={{ width: "100px", border: "none", height: "90%", cursor: "pointer", marginRight: "10px" }} >
                    <span  >
                        About
                    </span>
                </Link>
                <Link to={`/pokemon`} className='button button1' style={{ width: "100px", border: "none", height: "90%", cursor: "pointer", marginRight: "10px" }} >
                    <span  >
                        Pokemon
                    </span>
                </Link>
                <Link to={`#`} className='button button1' style={{ width: "100px", border: "none", height: "90%", cursor: "pointer", marginRight: "10px" }} >
                    <span  >
                        Contact me
                    </span>
                </Link>


            </div>
            <button className='button button2' style={{ width: "10%", border: "none", alignItems: 'center', justifyContent: "center", cursor: "pointer" }} onClick={Logout}>
                Logout
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to log out ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={con_firm} variant="contained" color='error'>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <Space direction="vertical" style={{ width: '100%' ,marginTop:"20px"}}>
               <Alert
                    message="Warning"
                    description="You haven't entered your Name and Lastname yet."
                    type="warning"
                    showIcon
                    closable
                />
             
            </Space> */}
            <div className="dropdown" >
                <div className='icon-nav' style={{ alignItems: "center", width: "50px", justifyContent: "center" }} onClick={menu}><FormatListBulletedIcon fontSize='medium' /></div>
                <div className={`${openmenu == true ? "dropdown-content" : "none"}`} >
                    <Link to={`/home`} >Home</Link>

                    <Link to={`/about`} >About</Link>


                    <NavLink to={`/pokemon`}> Pokemon</NavLink>
                    <a href="#"> Contact me</a>

                    <a style={{ border: "none", color: '#B31312', cursor: "pointer" }} onClick={Logout}>
                        Logout
                    </a>
                </div>
            </div>
            <>

                <Modal
                    title="Change Name "
                    centered
                    open={update_}
                    onOk={Update}
                    onCancel={() => setUpdate_(false)}

                >  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Input placeholder={name} style={{ marginBottom: "10px", width: "48%", display: "flex" }} id='name' maxLength={10} required />
                        <Input placeholder={lastname} style={{ marginBottom: "10px", width: "48%", display: "flex" }} id='lastname' maxLength={10} required />
                    </div>
                </Modal>


            </>
        </div>




    )
}
