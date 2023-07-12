
import React, { useEffect, useState } from 'react';
import Navber from '../component/navber'
import Footer from '../component/footer'
import axios from 'axios';
const url = 'https://pokeapi.co/api/v2/pokemon?limit=200';
const Pokemon = () => {
    const [data, setData] = useState([])
    const [dataurl, setDataurl] = useState([])
    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data.results)

        })
            .catch((error) => {
                console.log(error);
            });
    }, [url]);
    const listItems = data.map((item) =>
            <div className="column" key={item.name}>{item.name}</div>
    );
    return (
        <>
            <div>
                <Navber />
                <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "200vh", background: "#F0F0F0" }}>
                    <div style={{ display: "flex", background: "#FFFFFF", width: "90%", height: "90%", marginTop: "60px", overflowX: 'scroll' }}>
                        <div className="row">
                            {listItems}
                        </div>
                    </div>
                </div>
                <Footer />


            </div>
        </>
    )
};
export default Pokemon;