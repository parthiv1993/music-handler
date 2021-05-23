
import React from 'react';

const allowedTags = [ 'b', 'i', 'h1','u','em', 'strong', 'a' ,'span']

const regexForOpeningTag = new RegExp(/(<([a-z0-9]+)>)/,'gi');

const SanitizedHTML = ({value})=>{
    
    const getPartitionsFromString = (value)=>{
        const tagFound = value.match(regexForOpeningTag)[0];
        const startIndex = value.indexOf(tagFound);
        const endTag = tagFound.substr(0,1)+"/"+tagFound.substring(1)
        const endIndex = value.lastIndexOf(endTag)
        const pre = value.substr(0,startIndex);
        const post = value.substring(endIndex+endTag.length)
        const innerStringStart = startIndex+tagFound.length
        const innerString = value.substring(innerStringStart,endIndex);
        const tag = tagFound.substring(1,tagFound.length-1)
        const isValid= allowedTags.indexOf(tag)>-1 && endIndex>-1;
        return {
            pre,
            post,
            tag,
            innerString,
            isValid,
            innerStringStart,
        }
    }

    const getElement=(value)=>{
        const observations = getPartitionsFromString(value);
        if(observations.isValid){
            return [
                observations.pre,
                React.createElement(
                    observations.tag,
                    {key:observations.post},
                    getInnerHTML(observations.innerString)
                    ),
                getInnerHTML(observations.post)
            ]
        }else{
            return [
                value.substring(0,observations.innerStringStart),
                getInnerHTML(value.substring(observations.innerStringStart))
            ]
        }
        
    }

    const getInnerHTML = (value)=> {
        if(regexForOpeningTag.test(value)){
            return getElement(value);
        }
        return value
    }
   
    return React.createElement('span', {key:value }, getInnerHTML(value))
}

export default SanitizedHTML;