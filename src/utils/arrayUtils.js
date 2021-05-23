export const some = (arr,cb)=>{
    let ans = false;
    arr.forEach((obj)=>{
        if(ans){
            return true;
        }else{
            ans = Boolean(cb(obj))
        }
    })
    return ans;
}

export const every = (arr,cb)=>{
    let ans = true;
    arr.forEach((obj)=>{
        if(!ans){
            return false;
        }else{
            ans = Boolean(cb(obj))
        }
    })
    return ans;
}