import React, { useState, useEffect } from 'react'
import naber from './navber.css'
import axios from 'axios';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
export default function navber() {
    const [openmenu, setOpenmenu] = useState(false)
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const url = 'http://localhost:3333'
    const token = localStorage.getItem('token')
    useEffect(() => {
        axios.post(url + '/authen', {
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
                setName(response.data.decoded.fname)
                return;
            }

        })
            .catch(function (error) {
                console.log(error)
            });

    }, [])

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
    return (
        <div style={{ display: "flex", width: "100%", background: '#DFD7BF', height: "50px" ,position:"fixed"}} className='body-nav'>
            <div style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "center", }} className='text-nav'  >
                <div style={{ display: "flex" }} >
                    <span style={{ marginLeft: "10px" }}  > Hi :   &nbsp; </span><p style={{ color: "#068FFF", cursor: 'pointer' }} id='fname' > {name} </p>
                </div>
            </div>
            <div style={{  textAlign: "center", width: "40%", height: "50px", alignItems: "center", display: "flex" ,marginLeft:"20px" }}>
             <a href='/home' className='button button1' style={{ width: "100px", border: "none", height: "90%", cursor: "pointer", marginRight: "10px" }}>  
                    <span  style={{alignItems:"center"}}>
                        Home
                    </span>
                </a>

                <a href='/about' className='button button1' style={{ width: "100px", border: "none", height: "90%", cursor: "pointer", marginRight: "10px" }} >
                    <span  >
                        About
                    </span>
                </a>
                <span className='button button1' style={{ width: "100px", border: "none", height: "90%", cursor: "pointer", marginRight: "10px" }} >
                    Contact me
                </span>

            </div>
            <button className='button button2' style={{ width: "10%", border: "none", alignItems: 'center', justifyContent: "center"}} onClick={Logout}>
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

            <div className="dropdown" >
                <div className='icon-nav' style={{ alignItems: "center", width: "50px", justifyContent: "center" }} onClick={menu}><FormatListBulletedIcon fontSize='medium' /></div>
                <div className={`${openmenu == true ? "dropdown-content" : "none"}`} >
                    <a href="/home">Home</a>

                    <a href="/about">About</a>


                    <a href="#"> Contact me</a>


                    <a style={{ border: "none", color: '#B31312' }} onClick={Logout}>
                        Logout
                    </a>
                </div>
            </div>
        </div>
    )
}
