import React, { useEffect, useState } from 'react';
import MusicCard from '../components/MusicCard/MusicCard.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import getDataFromBackend from '../dataHandlers/MusicDataHandler.js';
const defaultOptions = [
    {label : 'Title',value : 'title'},
    {label : 'Description',value : 'description'},
    {label : 'Keywords',value : 'keywords'}
] 

const SearchMusic = ()=>{

    const [serachFields,setSearchFields] = useState(defaultOptions);
    const [searchText, setSearchText] = useState(null);
    const [musicData,setMusicData] =useState([]);
    const [pageNumber,setPageNumber] = useState(1);

    const onSearch= (fields,value)=>{
        setSearchText(value);
        setSearchFields(fields);
        setMusicData([])
        setPageNumber(1)
    }

    useEffect(() => {
        const criterias= serachFields.map(obj=>obj.value);
        getDataFromBackend(criterias,searchText,pageNumber).then((res)=>{
            setMusicData(m=>[ ...m ,...res]);
        })
    }, [serachFields,searchText,pageNumber]);


    const handleScroll=()=>{
        const offsetHeight = document.documentElement.offsetHeight;
        const scrolled = document.documentElement.scrollTop;
        const desiredBuffer = window.innerHeight+200;
        if(offsetHeight-scrolled<desiredBuffer){
            setPageNumber(pageNumber+1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <section>
                <SearchBar 
                    onSearch={(fields,value)=>onSearch(fields,value)}
                    searchFields={defaultOptions}
                    ></SearchBar>
            </section>
            <section>
                {musicData.map((obj,index)=>
                    <MusicCard key={index} {...obj}>

                    </MusicCard>
                    // <div key={index}>
                    //     {obj.description}
                    // </div>
                )}
            </section>
        </>
    )
}
export default SearchMusic;