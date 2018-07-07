export function checkPromise (obj, extra = null){
  let valid = true;
  if(!extra){
    valid = Object.values(obj).every((val) => val !== null);
  }else{
    for(let i in obj){
      if(extra.indexOf(i) !== -1){
        continue;
      }else{
        if(obj[i] === null){
          valid = false;
          break;
        }
      }
    }
  }

  return valid;
}