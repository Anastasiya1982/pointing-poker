export const getFallbackText=(firstName:string,lastName:string)=>{
  const first = firstName[0];
  let last;

  if(lastName ===''){
    last = firstName[firstName.length-1];
  }
  else {
    last = lastName[0];
  }

  let res = first.toUpperCase()+last.toUpperCase()
  return res
}
export const generateRandomId = () => {
  const id = Math.floor(Math.random() * 100);
  return id;
};
