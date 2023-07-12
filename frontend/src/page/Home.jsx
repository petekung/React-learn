
import React, { useEffect, useState, useContext, createContext } from 'react';
import { Button, Modal } from 'antd';
import Navber from '../component/navber'
import Footer from '../component/footer'
const Home = () => {
    const [update_, setUpdate_] = useState(false);
    const [data, setData] = useState([])
    const [dataurl, setDataurl] = useState([])
  
    return (
        <>
          
                <div>
                    <Navber/>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "100vh", background: "#F0F0F0" }}>
                        <div style={{ display: "flex", background: "#FFFFFF", width: "90%", height: "90%", marginTop: "60px", overflowX: 'scroll' }}>
                           

                            <h1>Home</h1>
                        </div>
                    </div>
                    <Footer />


                </div>
                <Modal
                    title="Change Name "
                    centered
                    open={update_}
                    onOk={() => setUpdate_(false)}
                    onCancel={() => setUpdate_(false)}
                >
              
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
    

        </>
    )
};
export default Home;