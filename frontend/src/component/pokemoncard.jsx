import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function pokemoncard({ item, index }) {
  const [data, setData] = useState([])
  const urlgetdata = item.url;
  useEffect(() => {
    axios.get(urlgetdata).then((response) => {
      setData(response.data)
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error);
      });

  }, [urlgetdata]);
  return (
    <div className="column" key={data.name}>
      <div>
        <span style={{fontSize:"18px"}} key={data.id}>
          {index + 1} {item.name}
        </span>
      </div>

      <img src={data.sprites?.front_default} ></img>


    </div>


  )
}
