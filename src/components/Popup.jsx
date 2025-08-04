export default function Popup(props){

  return (
    <>
      <section className="w-dvw h-dvh bg-stone-950/30 backdrop-blur-sm fixed p-50 flex justify-center items-center z-50">
        <div className={`bg-black p-[1rem] border ${props.Animacao} w-auto border-blue-700 rounded-lg`}>
          <div className="Brand flex justify-start border-b border-stone-900 items-center">
            <span className="text-white cursor-default font-bold text-xl">{props.Titulo}</span>
          </div>

          <div className="Content flex w-full mb-[10px] justify-start items-center">
            <span className="text-white cursor-default">{props.Mensagem}</span>
          </div>

          <div className="Action flex w-full">
            {props.children}
          </div>
        </div>
      </section>
    </>
  );

}
