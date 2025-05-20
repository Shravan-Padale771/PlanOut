import React from 'react'
import Button from './Button'

export default function Hero() {
  return (
    <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4 '>
      <div className='flex flex-col gap-4'>
      <p>IT'S TIME TO GET</p>
      <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>Winter<span className='text-blue-400'>Arc</span></h1>
      </div>
      <p className='text-sm md:text-base font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit.<span className='text-blue-400 font-medium'> Eum temporibus </span>eligendi quam delectus non itaque qui, aspernatur,  eius. Enim, totam.<span className='text-blue-400 font-medium'> Laudantium libero repudiandae </span>quasi labore, officiis dolor.</p>
      <Button func={() => {
        window.location.href = '#generate'
      }} text={'Accept and Begin'}></Button>
    </div>
  )
}
