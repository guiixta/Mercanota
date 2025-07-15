export default function Button({buttonClass, nomeButton, buttonType}) {
  return(
    <>
      <button className={`${buttonClass}`} type={`${buttonType}`}>{nomeButton}</button>
    </>
  )
}
