import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState,useEffect  } from 'react';
import React from 'react'
import axios from 'axios';
import Navber from './component/navber'
import Footer from './component/footer'
const Home = () => {
    const [open, setOpen] = React.useState(false);
    const [opendraw, setOpendraw] = React.useState(false);
    const [name, setName] = React.useState('');
    const [ipAddress, setIpAddress] = React.useState('');
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
                let input = {
                    "email": response.data.decoded.email
                }
                const users = 'http://localhost:3333'
                // toast.success('Welcom : '+ name, {
                //     position: toast.POSITION.TOP_CENTER,
                //     theme: "colored"

                // });
                axios.post(users + '/users', input, {
                }
                ).then(function (res) {
                    setName(res.data.users[0].fname)
                }).catch(function (error) {
                    console.log(error)
                });
                return;
            }

        })
            .catch(function (error) {
                console.log(error)
            });

    }, [])
    return (
<>
        <div>
            <Navber name ={name}/>
            <div></div>
            <Footer/>

            
        </div>
</>
    )
};
export default Home;