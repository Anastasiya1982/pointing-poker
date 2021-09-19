export const getFallbackText=(str:string)=>{
  let string= str;
  const first = string[0];
  const last = string[string.length-1];
  let res=first.toUpperCase()+last.toUpperCase()
  return res
}
export const generateRandomId = () => {
  const id = Math.floor(Math.random() * 100);
  return id;
};
