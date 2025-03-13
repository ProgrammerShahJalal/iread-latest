import React from 'react'
import ProfileLayout from '../../../components/ProfileLayout';
import Image from 'next/image';

function InProfileNotFoundPage() {
  return (
    <ProfileLayout>
<div className='w-96 min-h-[100vh] text-center mx-auto'>
      <h2 className='font-bold text-4xl'>404</h2>
      <h2 className='font-bold text-4xl'>AI MAMA NA PLS!!!</h2>
      <Image
      className='w-64 h-64'
      width={600}
      height={600}
      src="/404.png"
      alt='not found image'
      />
      
    </div>
    </ProfileLayout>
    
  )
}

export default InProfileNotFoundPage;
