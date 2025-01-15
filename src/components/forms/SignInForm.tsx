import React from 'react'

const SignInForm = () => {
  return (
    <form  className='flex flex-col gap-4 items-center justify-center w-[400px]'>
      <label  className='w-full'>
        <input
          placeholder="mail"
          className="input input-primary w-full"
        />
      </label>
      <label  className='w-full'>
        <input
          placeholder="pass"
          className="input input-primary w-full"
        />
      </label>
        <button
          type="submit"
          className="btn btn-primary bg-green-900 w-full" >
          Log In
        </button>
    </form>
  )
}

export default SignInForm