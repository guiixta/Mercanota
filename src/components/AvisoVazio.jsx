export default function AvisoVazio(props) {
  return(
    <>
    <div className={`p-[1rem] ${props.CorDeFundo} ${props.LarguraAviso} flex flex-col gap-[10px] rounded-xl`}>
        <div className="Brand">
          <h1 className="text-base font-bold cursor-default"><i className="bi bi-exclamation-circle-fill mr-[5px]"></i>{props.NameAviso}</h1>
        </div>
        <div className="Content flex-wrap flex">
          <span className="cursor-default font-bold">{props.Content}</span>
        </div>
        <div className="Action">
          <button className={`btn ${props.StyleButton}  `} >{props.Action}</button>
        </div>
      </div>
    </>
  )
}
