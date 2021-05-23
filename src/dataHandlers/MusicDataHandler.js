import { some } from '../utils/arrayUtils';
import musicData from './Music.data';
const pageSize = 10;
const removeHTMLTagsIfPresent = (str)=>{
    // return str;
    return (str || "").replace(/(<([a-z0-9]+)>)/gi, "");
}

const getData = (searchCriteria,searchValue,pageNumber)=>{
    const parseData = getParsedData();
    const filteredData = filterData(parseData,searchCriteria,searchValue);
    const paginatedData = getPaginatedData(filteredData,pageNumber)
    console.log(paginatedData);
    return new Promise((resolve,reject)=>{
        return resolve(paginatedData)
    })
}

const getPaginatedData = (filteredData,pageNumber)=>{
    console.log((pageNumber-1)*pageSize ,pageNumber*pageSize);
    return filteredData.slice((pageNumber-1)*pageSize , pageNumber*pageSize)
}

const getParsedData = ()=>{
    return musicData.sections[0].assets.map(shortenObj)
}

const shortenObj = (obj)=>{
    return {
        categories: obj.categories,
        description : removeHTMLTagsIfPresent(obj.description.join(". ")),
        descriptionWithTags : obj.description.join(", "),
        supplementInformation : (obj.supplement_information || []).join(", "),
        images: obj.images,
        keywords: obj.keywords,
        title : removeHTMLTagsIfPresent(obj.title),
        titleWithTags : obj.title
    }
}

const filterData = (data,searchCriteria,searchValue)=>{
    const isSearchValueValid = searchValue === null || searchValue.trim() === '';
    if(isSearchValueValid){
        return data;
    }
    if(searchCriteria.length === 0 ){
        return data;
    }
    const searchValues = searchValue.split(" ");

    return data.filter((obj)=>{
        return doesDataPassTheFiltering(searchCriteria,searchValues,obj)
    })
}

function doesDataPassTheFiltering(criteria,searchValues,dataObj){
    return some(criteria,(criteriaKey)=>{
        let value = dataObj[criteriaKey];
        if(Array.isArray(value)){
            value = value.join(" ")
        }
        value= value.toLowerCase();
        return some(searchValues,(searchValue)=>(value.indexOf(searchValue.toLowerCase()) > -1));
    })
}

export default getData;