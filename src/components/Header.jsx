import React from 'react'
import '../css/header.css'
import '../css/index.css'
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <>
      <header className='w-full bg-black p-[1rem]' >
        <nav className='flex w-full justify-between items-center'>
          <div className='Brand cursor-default ml-[5px]'>
            <Link to="/home" className='font-extrabold text-blue-500 font-archivoblack'>MERCANOTA</Link>
          </div>
        
          <div className='Options'>
            
          </div>

          <div className='UserOptions mr-[5px]'>
            <button type='button' className='text-[1.5rem] text-white cursor-pointer'><i className='bi bi-person-circle'></i></button>
          </div>

        </nav>
      </header>
    </>
  );

}

