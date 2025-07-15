
export default function Section({sectionClass, children}){
  return(
    <>
      <section className={`${sectionClass}`}>
        {children}
      </section>
    </>
  )
}

export function Div({divClass, children}){
  return(
    <>
      <div className={`${divClass}`}>
        {children}
      </div>
    </>
  )
}
