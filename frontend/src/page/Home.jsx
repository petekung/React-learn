
import React, { useEffect, useState,useContext } from 'react';
import Navber from '../component/navber'
import Footer from '../component/footer'
import Update from '../component/updatename';
const Home = () => {
    const [data, setData] = useState([])
    const [dataurl, setDataurl] = useState([])
    return (
        <>
            <div>
                <Navber />
                <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "100vh", background: "#F0F0F0" }}>
                    <div style={{ display: "flex", background: "#FFFFFF", width: "90%", height: "90%", marginTop: "60px", overflowX: 'scroll' }}>
                    <Update/>

                      <h1>Home</h1>
                    </div>
                </div>
                <Footer />


            </div>
        </>
    )
};
export default Home;