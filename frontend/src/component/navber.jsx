import React from 'react'
import naber from './navber.css'
import { Image } from 'antd';
export default function navber({name}) {
    const Logout = () => {
      localStorage.removeItem('token');
      window.location.assign("/login")
        console.log("test");

    };
    console.log(name);
    return (
        <div style={{ display: "flex", width: "100%", background: '#DFD7BF' }} className='body-nav'>
            <div style={{width:"20%",display:"flex",alignItems:"center",justifyContent:"center"}} >
             
                <Image src="https://valorantinfo.com/images/us/yoru_valorant_icon_3600.webp" style={{borderRadius:"50px", width:"30px",height:"30px"}} className='img-nav'/> 
               <div style={{display:"flex" }} className='text-nav' >
               <span style={{marginLeft:"10px"}} className='text-nav' > Hi  &nbsp; </span><p style={{color:"#068FFF"}} className='text-nav'> {name} </p> 
                </div> 
              
               
            </div>
            <div style={{ justifyContent: "space-between", textAlign: "center", width: "40%", height: "50px", alignItems: "center", display: "flex", margin: "0 auto " }}>
          
            <button className='button button1' style={{width:"150px",border:"none",height:"90%"}}>
                    Home
                </button>
                <button className='button button1'  style={{width:"150px",border:"none",height:"90%"}}>
                    About
                </button>
                <button className='button button1'   style={{width:"150px",border:"none",height:"90%"}}>
                    Contact me
                </button>
              
            </div>
            <button className='button button2'   style={{width:"10%",border:"none",alignItems:'center',display:"flex",justifyContent:"center"}} onClick={Logout}>
                    Logout
                </button>

        </div>
    )
}
