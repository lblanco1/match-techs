import React from 'react';
import Construcao from "../../../../../src/assets/img/Construcao.png";

export default function Manutention() {
    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',  }}>
            <img src={Construcao} alt="Imagem de construção" style={{ maxWidth: '100%', maxHeight: '100%', width: '30%' ,
    height: '45% '}} />
        </div>
    );
}
