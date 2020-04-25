
export function areEquals(stuff1,stuff2){
  return JSON.stringify(stuff1)===JSON.stringify(stuff2)
  /* 
  //Early returns if types are differents
  if(Array.isArray(stuff1) && !Array.isArray(stuff2)){
    return false;
  }
  if(Array.isArray(stuff2) && !Array.isArray(stuff1)){
    return false;
  }
  if(typeof stuff1 === 'object' && typeof stuff2 !== 'object' ){
    return false;
  }
  if(typeof stuff2 === 'object' && typeof stuff1 !== 'object' ){
    return false;
  }

  //If not an object so not an array too, compare it with classic ===
  if(typeof stuff1 !== 'object' && typeof stuff2 !== 'object' ){
    return stuff1 === stuff2;
  }

  //If both are arrays
  if(Array.isArray(stuff1) && Array.isArray(stuff2)){
    return stuff1.every((el,idx) => areEquals(el,stuff2[idx]))
  }

  //If both are objects
  return Object.keys(stuff1).every(key => areEquals(stuff1[key],stuff2[key])) */
}
