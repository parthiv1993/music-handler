import React from 'react';
import './Button.css';

const Button = ({children,primary,type='',handler=()=>{}})=>{

    return <button 
            type={type}
            onClick={(event)=>handler(event)}
            className={primary?'custom-button primary':'custom-button'}>
        {children}
    </button>
}

export default Button;