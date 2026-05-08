import React from 'react'
import { Button } from '@/components/ui/button'

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC7606] rounded-lg flex flex-col items-start'>
        <p></p>
        <p className='font-bold text-2xl text-white'>Career Coach Agent</p>
        <Button variant={'outline'} className='mt-3'>Let's Get Started</Button>
    </div>
  )
}

export default WelcomeBanner
