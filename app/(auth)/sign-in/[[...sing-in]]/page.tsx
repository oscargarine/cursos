import { SignIn } from "@clerk/nextjs"
import React from 'react'

function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-semibold text-4x1">Welcome back!</h1>
      <p className="text-xl">Sign In to continue to your account</p>

      <SignIn />
    </div>
  )
}

export default SignInPage