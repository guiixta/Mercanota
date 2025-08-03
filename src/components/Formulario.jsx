
export default function Formulario({phpF, method, children, estilosForm, onSubmit}) {

  const ValoresCondicional = {};

  if(onSubmit !== undefined){
    ValoresCondicional.onSubmit = onSubmit;
  }

  return(
    <>
      <form action={phpF} method={`${method}`} className={`${estilosForm}`} {...ValoresCondicional}>
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

export function Input({estilosInput, typeInput, placeholder, nameInput, isRequired, valueInput, idInput, onChange}){
  
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
