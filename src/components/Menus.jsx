import { Link } from "react-router-dom";


export default function ItemMenu({path, Icon, Name}) {  
  return (
    <>
      <Link to={path} className="ItemOption p-[1rem] inset-shadow-white inset-shadow-sm bg-stone-800 text-white w-40 h-30 cursor-pointer flex flex-col rounded-lg">
        <div className="Icon flex justify-center h-[50%] items-center text-center">
          <i className={Icon}></i>
        </div>

        <div className="Name font-bold text-center h-[50%] flex flex-wrap justify-center items-center">
          <span className="">{Name}</span> 
        </div>
        <span className="flex w-full bg-sky-500 h-px mt-[10px]"></span>
      </Link>
    </>
  );

 

}
