import React from 'react';

const Highlighter = ({value,wordsToHighlight})=>{
    const reduceFunctionForEachWord=(fragments,word)=>{
        const tempResult=[];
        const reg = new RegExp(word,'gi');
        fragments.forEach(fragment=>{
            if(typeof fragment == 'string'){
                const fragmentSplit= fragment.split(reg);
                fragmentSplit.forEach((foundFragment,i)=>{
                    tempResult.push(foundFragment);
                    if(i!=fragmentSplit.length-1){
                        tempResult.push(React.createElement('mark',{key:`${i}${word}`},word))
                    }
                })
            }
            else{
                tempResult.push(fragment)
            }
        })
        return tempResult;
    }
    return wordsToHighlight.reduce((acc,word)=>reduceFunctionForEachWord(acc,word),[value])
}

export const highlighterWithWords = (wordsToHighlight)=>{
    return (text)=><Highlighter value={text} wordsToHighlight={wordsToHighlight}></Highlighter>
}

export default Highlighter;