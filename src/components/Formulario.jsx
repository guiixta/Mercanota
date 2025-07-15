
export default function Formulario({phpF, method, children, estilosForm}) {
  return(
    <>
      <form action={phpF} method={`${method}`} className={`${estilosForm}`}>
        {children}        
      </form>
    </>
  )
}

export function Label({LabelText, estilosLabel, nameInput}){
  return(
    <>
      <label className={`${estilosLabel}`} htmlFor={`${nameInput}`}>{LabelText}</label>
    </>
  )
}

export function Input({estilosInput, typeInput, placeholder, nameInput, isRequired}){
  return(
    <>
     <input className={`${estilosInput}`} type={`${typeInput}`} placeholder={`${placeholder}`} name={`${nameInput}`} required={isRequired}/>
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
