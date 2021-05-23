import React, { useState } from 'react';
import  './MultiSelect.css';

const MultiSelect = ({options=[], onChange=(val)=>console.log(val),fullWidth=true,})=>{

    const [value,setValue] = useState(options);
    const [isOptionMenuOpen,setOptionMenuOpen] = useState(false);

    const toggleOptionMenu = (event)=>{
        event.preventDefault();
        setOptionMenuOpen(!isOptionMenuOpen);
    }

    const onOptionToggle = (event,option)=>{

        event.preventDefault();
        const index = value.findIndex((obj)=>obj===option)
        const localValue = [...value];
        if(index>-1){
            localValue.splice(index,1)
        }else{
            localValue.push(option);
        }
        setValue(localValue)
        onChange(localValue)
    }

    const isOptionSelected = (option)=>{
        const isOptionSelected = value.find((obj)=>obj===option);
        return Boolean(isOptionSelected);
    }

    const getLabel = ()=>{
        if(value.length === 0)
            return 'Please Select'
        if(value.length === options.length)
            return 'All'
        return value.map((obj)=>obj.label).join(",")
    }

    const toggleAll=(event)=>{
        event.preventDefault();
        if(value.length !== options.length){
            setValue(options);
            onChange(options)
        }else{
            setValue([])
            onChange([])
        }
    }

    const keyPressHandler=(event,option)=>{
        if(isSpacebarPressed(event)){
            onOptionToggle(event,option);
        }
    }

    const isSpacebarPressed = (event) => event.key === ' ' || event.key === 'Spacebar'

    return (
        <>
            <div className= {fullWidth? "multi-select-container fullwidth" : 'multi-select-container'}>
            
                <button 
                    type="button"
                    className='custom-multi-select' 
                    onClick={(event)=>toggleOptionMenu(event)}>
                    <span  >{getLabel()}</span>
                </button>
                {
                        isOptionMenuOpen && 
                        <div className="select-option-container">
                            <div 
                                className="option-container"
                                tabIndex="0" 
                                key={'All'}
                                onKeyPress={(event)=> {isSpacebarPressed(event) && toggleAll(event)}}
                                onClick={(event)=>toggleAll(event)}
                                >
                                <label>
                                    <input 
                                        className="option-checkbox" 
                                        type="checkbox" 
                                        tabIndex="-1"
                                        checked={value.length === options.length} 
                                        readOnly/>
                                    {'All'}
                                </label>
                            </div>
                            {options.map(option=>
                            <div 
                                className="option-container"
                                tabIndex="0" 
                                key={option.value} 
                                onKeyPress={(event)=> keyPressHandler(event,option)}
                                onClick={(event)=>onOptionToggle(event,option)}>
                                    <label>
                                    <input 
                                        className="option-checkbox" 
                                        type="checkbox" 
                                        tabIndex="-1"
                                        checked={isOptionSelected(option)} 
                                        readOnly/>
                                        {option.label}
                                    </label>
                        </div>)}
                    </div>}
            </div>
        </>
    )
}

export default MultiSelect;