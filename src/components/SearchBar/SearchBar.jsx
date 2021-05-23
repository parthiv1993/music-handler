import React, { useState } from 'react';
import Button from '../Button/Button';
import MultiSelect from '../MultiSelect/MultiSelect';
import './SearchBar.css';

const SearchBar = (props)=>{
    const [searchFields,setSearchFields] = useState(props.searchFields);
    const [searchValue,setSearchValue] = useState(null);


    const inputFieldChangeHandler = (event)=>{
        event.preventDefault();
        const value = event.target.value;
        setSearchValue(value);
    }

    const searchClickHandler = (event)=>{
        event.preventDefault();
        props.onSearch(searchFields,searchValue);
    }

    return(
        <>
        <form onSubmit={(event)=>searchClickHandler(event)} >
            <section className="search-container">
                
                
                    <div className="search-input-container">
                        <label>
                            Search Text
                            <input 
                                placeholder="Search Text"
                                className="search-input"
                                type="text" 
                                onChange={ev=>inputFieldChangeHandler(ev)} style={{width:'100%'}}/>
                        </label>
                    </div>
                    <div className="search-type-container">
                        <label>
                            Search By
                            <MultiSelect
                                options={props.searchFields}
                                onChange={val=>setSearchFields(val)}
                                fullWidth={true}
                            ></MultiSelect>
                        </label>
                    </div>
                    <div className="search-button-container">
                        <Button primary handler={(event)=>searchClickHandler(event)} type={'submit'}>
                            Search
                        </Button>
                    </div>
            </section>

            </form>
        </>
    )
}

export default SearchBar;