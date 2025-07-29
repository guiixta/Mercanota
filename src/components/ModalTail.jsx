export default function ModalTailwind({ClassName, TitleClass, TitleModal, onCloser, onConfirm, Mensagem, CloseButtonClass, ConfirmButtonClass}) {
 
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onCloser}
      ></div>

      <div
        id="modal-container"
        className="fixed inset-0 z-50 flex justify-center items-center p-4"
        // Impede que o clique no modal feche o modal (a propagação é interrompida)
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-stone-800 rounded-lg shadow-xl w-full max-w-md ${ClassName}`}>
          <div className="flex justify-between items-center p-4 border-b border-stone-700">
            <h5 className={`text-xl font-bold text-white ${TitleClass}`}>
              {TitleModal}
            </h5>
            <button
              type="button"
              onClick={onCloser}
              className="text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="p-4 text-gray-300">
            <p>{Mensagem}</p>
          </div>

          <div className="flex justify-end items-center p-4 border-t border-stone-700 space-x-2">
            <button
              type="button"
              onClick={onCloser}
              className={`px-4 py-2 rounded font-semibold text-white bg-gray-600 hover:bg-gray-700 ${CloseButtonClass}`}
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`px-4 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 ${ConfirmButtonClass}`}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
