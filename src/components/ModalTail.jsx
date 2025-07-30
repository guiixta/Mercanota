export default function ModalTailwind({ClassName, TitleClass, TitleModal, onCloser, Mensagem, CloseButtonClass, ButtonTask, SvgLoading}) {

  return (
    <>  
      <div className="flex inset-x-[0] justify-center fixed bg-transparent items-center z-[50]">
        <div className={`bg-stone-800 rounded-lg top-[0] animate__animated animate__fadeInDown animate__faster shadow-xl w-full max-w-md ${ClassName}`}>
          <div className="flex justify-between items-center p-3 border-b border-stone-700">
            <h5 className={`text-xl font-bold text-white ${TitleClass}`}>
              {TitleModal}
            </h5>
          </div>

          <div className="p-4 text-gray-300 cursor-default">
            <p>{Mensagem}</p>
          </div>

          <div className="flex justify-end items-center p-2 border-t border-stone-700">
            <button type="button" onClick={onCloser} className={`${CloseButtonClass}`}>
              <svg className={`mr-2 size-5 animate-spin ${SvgLoading}`} viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="40"
                  strokeDashoffset="20"
                />
              </svg>
              <span>{ButtonTask}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
