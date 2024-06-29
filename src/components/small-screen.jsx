import React from 'react'

const SmallScreen = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-3/5 h-24 flex justify-center items-center flex-col '>
            <h1 className='text-[24px] font-bold text-[#344054] text-center'>Sizning ekraningiz juda kichkina!</h1>
            <p className='text-base text-[#475467] text-center'>Ushbu sahifaga kirish uchun ekraningiz kengligi kamida 1000px bo'lishi kerak.</p>
        </div>
    </div>
  )
}

export default SmallScreen