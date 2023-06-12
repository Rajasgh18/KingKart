import React from 'react'

const LoginSignup = () => {
  return (
    <section className='min-h-screen w-full bg-gradient-to-br from-violet-400 via-violet-500 to-violet-400 shadow-xl flex items-center justify-center'>
      <section className='h-[500px] w-[60%] flex flex-col p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-2 border-gray-300 rounded-lg shadow-lg'>
        <label htmlFor="username" className='font-viga'>Username</label>
        <input type="text" className='rounded p-2 backdrop-filter border-2 border-white bg-opacity-20 bg-slate-300 backdrop-blur-lg' />
        <label htmlFor="password" className='font-viga'>Password</label>
        <input type="text" className='rounded p-2 backdrop-filter border-2 border-white bg-opacity-20 bg-slate-300 backdrop-blur-lg' />
      </section>
    </section>
  )
}

export default LoginSignup