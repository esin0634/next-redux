import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex w-full justify-center flex-col items-center ">
      <p className='text-2xl'> Hello ! </p> 
      <p> You can find users by going to users tab. </p> 
      <p> To add a new user go to create user!</p>
     
    </main>
  )
}
