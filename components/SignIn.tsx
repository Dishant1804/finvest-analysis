"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const SignInComponent = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleGetstartedButton = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`, {
      email,
      password
    }, {
      withCredentials: true
    })
    console.log(res.data)
    if (res.data) {
      window.localStorage.setItem("userid", res.data.id)
      router.push('/analyze')
    }
  }

  const handleSignUpclick = () => {
    router.push('/signup')
  }

  return <div className="w-full min-h-screen bg-[#00040f] text-dim-white flex flex-col justify-center items-center">
    <div className="w-full h-full flex max-w-7xl justify-center items-center">
      <div className="w-full max-w-md border border-r-4 border-b-4 border-neutral-400 rounded-lg p-6">
        {/*title */}
        <div className="w-full flex flex-col mb-8 gap-2 justify-center items-center">
          <h1 className="text-2xl text-white/90 ">SignIn</h1>
          <h4 className="text-sm text-neutral-500 text-center">Welcome back!</h4>
        </div>

        {/**input boxes */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-lg text-white/90">Email</h3>
            <Input className="border border-neutral-600 text-white/90" placeholder="Email" onChange={handleEmail} value={email} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-lg text-white/90">Password</h3>
            <Input type="password" className="border border-neutral-600 text-white/90" placeholder="Password" onChange={handlePassword} value={password} />
          </div>
        </div>

        <Button className="w-full mt-6 bg-blue-gradient text-black hover:scale-101" onClick={handleGetstartedButton}>SignIn <ArrowRight /> </Button>
        <div className="w-full flex justify-center items-center mt-3">
          <h5 className="text-sm text-neutral-500">Don&apos;t have an account? <span onClick={handleSignUpclick} className="underline cursor-pointer">SignUp</span></h5>
        </div>
      </div>
    </div>
  </div>
}

export default SignInComponent