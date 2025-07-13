import React from 'react'
import './header.css'
import { Link } from 'react-router-dom';

export default function Header({path}) {
  return (
    <>
      <header className='w-full bg-sky-500 p-[1rem]' >
        <nav className='flex w-full justify-between items-center'>
          <div className='Brand cursor-default ml-[5px]'>
            <Link to={path} className='font-bold'>Mercanota</Link>
          </div>
        
          <div className='Options'>
            
          </div>

          <div className='UserOptions mr-[5px]'>
            <button type='button' className='text-[1.5rem] cursor-pointer'><i className='bi bi-person-circle'></i></button>
          </div>

        </nav>
      </header>
    </>
  );

}

