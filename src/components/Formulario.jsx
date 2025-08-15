
export function Label({LabelText, htmlFor, children}){
  return(
    <>
      <label className="text-white font-bold cursor-default" htmlFor={htmlFor}>{LabelText}{children}</label>
    </>
  )
}

export function Input({typeInput, placeholder, nameInput, isRequired, valueInput, idInput, onChange}){
  
  const ValoresCondicional = {};

  if (valueInput !== undefined){
    ValoresCondicional.value = valueInput;
  }

  if (idInput !== undefined){
    ValoresCondicional.id = idInput;
  }

  if (onChange !== undefined){
    ValoresCondicional.onChange = onChange;
  }

  return(
    <>
     <input className="bg-stone-500 border border-white text-white font-bold p-[0.5rem] rounded-sm" {...ValoresCondicional} type={`${typeInput}`} placeholder={`${placeholder}`} name={`${nameInput}`} required={isRequired}/>
    </>
  )
}


