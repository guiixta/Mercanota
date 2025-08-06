
export function SvgLoading(){
  return (
    <>
      <svg className="mr-2 size-5 animate-spin" viewBox="0 0 24 24">
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
    </>
  )
}
