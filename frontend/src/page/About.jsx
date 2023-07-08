import React from 'react'
import Navber from '../component/navber'
import Footer from '../component/footer'
function About() {
  return (
    <>
    <Navber/>
    <div style={{display:"flex",justifyContent:"center" ,width:"100%",height:"100vh",background:"#F0F0F0"}}>
                 <div style={{display:"flex",background:"#FFFFFF",width:"90%",height:"90%",marginTop:"60px"}}>
          About

                 </div>
             </div>
    <Footer/>
    </>
  )
}

export default About
