
import React, { useEffect, useState } from 'react';
import Navber from '../component/navber'
import Footer from '../component/footer'
import axios from 'axios';
const urlgetname = 'https://pokeapi.co/api/v2/pokemon?limit=20&&offset=0';
const urlgetdata = 'https://pokeapi.co/api/v2/pokemon/';
import Pokemoncard from '../component/pokemoncard'
const Pokemon = () => {
    const [data, setData] = useState([])
    const [dataurl, setDataurl] = useState([])
    useEffect(() => {
        axios.get(urlgetname).then((response) => {
            setData(response.data.results)
        })
            .catch((error) => {
                console.log(error);
            });

    }, [urlgetname]);
    const listItems = data.map((item, index) => {
        return (
            <Pokemoncard item={item} index={index} />
        )

    }
    );
    return (
        <>
            <div>
                <Navber />
                <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "91vh", background: "#F0F0F0" }}>
                    <div style={{ display: "flex", background: "#FFFFFF", width: "90%", height: "90%", marginTop: "60px", overflowX: 'hidden' }}>
                        <div className="row" key={data.name}>
                        <div style={{textAlign:"right", marginBottom:"10px",marginRight:"20px",marginTop:"10px"}}>
                                <h2>
                                Search
                                 </h2>
                         
                            </div>
                            {listItems}
                            <div style={{textAlign:"center", marginBottom:"10px"}}>
                                <h2>
                                Next
                                 </h2>
                         
                            </div>
                        </div>




                    </div>
                </div>

                <Footer />


            </div>
        </>
    )
};
export default Pokemon;