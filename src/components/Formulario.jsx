
export default function Formulario({phpF, method, children, estilosForm}) {
  return(
    <>
      <form action={phpF} method={`${method}`} className={`${estilosForm}`}>
        {children}        
      </form>
    </>
  )
}

export function Label({LabelText, estilosLabel, htmlFor, children}){
  return(
    <>
      <label className={`${estilosLabel}`} htmlFor={htmlFor}>{LabelText}{children}</label>
    </>
  )
}

export function Input({estilosInput, typeInput, placeholder, nameInput, isRequired, valueInput, idInput}){
  
  const ValoresCondicional = {};

  if (valueInput !== undefined){
    ValoresCondicional.value = valueInput;
  }

  if (idInput !== undefined){
    ValoresCondicional.id = idInput;
  }

  return(
    <>
     <input className={`${estilosInput}`} {...ValoresCondicional} type={`${typeInput}`} placeholder={`${placeholder}`} name={`${nameInput}`} required={isRequired}/>
    </>
  )
}

export function Select({id, name, options = [], estilosSelect, placeholder }) {
  return(
    <> 
      <select id={`${id}`} className={`${estilosSelect}`} placeholder={`${placeholder}`} name={`${name}`}>
        {
          options.map((options) => {
            return(
              <option value={`${options.value}`}>{options.name}</option>
            )
          })
        }
      </select>
    </>
  )
}
