import '../css/index.css'  

export default function SectionT1Button(props){
  return(
    <>
      <section className={`${props.backgroundC} w-full flex flex-col p-[5rem] gap-[15px] border  ${props.border}`}>
        <div className="Brand w-full flex justify-center items-center text-center">
          <h1 className="cursor-default text-white font-bold text-5xl">{props.title}</h1>
        </div>

        <div className="Content">
          <span className={`${props.spanColor} cursor-default text-justify flex justify-center`}>{props.content}</span>
        </div>

        <div className="Action flex w-full justify-center items-center">
          <button className={props.button}>{props.buttonName}</button>
        </div>
      </section>
    </>
  )

}
