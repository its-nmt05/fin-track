import React, { useState } from "react"
import { Button, Input, Link, Spinner } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import Logo from "../static/logo/Logo"

function Signup() {
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { register, handleSubmit } = useForm()

  const signupUser = async (userData) => {
    setIsLoading(true)
    const { error } = await signup(userData)
    setError(error?.message)
    setIsLoading(false)
  }

  return !isLoading ? (
    <div className="flex flex-col h-screen justify-center px-8">
      <div>
        <Logo className="mx-auto w-auto" size={16} />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to FinTrack
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 mb-2" onSubmit={handleSubmit(signupUser)}>
          <Input
            autoFocus
            isRequired
            label="Name"
            placeholder="Enter your full name"
            labelPlacement="outside"
            radius="sm"
            autoComplete="off"
            classNames={{
              label: "font-semibold ml-2",
              inputWrapper: "mb-4",
            }}
            {...register("name", { required: true })}
          />
          <Input
            isRequired
            type="email"
            label="Email"
            placeholder="Enter your email"
            labelPlacement="outside"
            radius="sm"
            autoComplete="off"
            classNames={{
              label: "font-semibold ml-2",
              inputWrapper: "mb-4",
            }}
            {...register("email", { required: true })}
          />
          <Input
            isRequired
            type="password"
            label="Password"
            placeholder="Enter your password"
            labelPlacement="outside"
            radius="sm"
            classNames={{
              label: "font-semibold ml-2",
            }}
            {...register("password", { required: true })}
          />
          <Button type="submit" className="w-full bg-black text-white">
            Create account
          </Button>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>
        <div className="flex items-center justify-center">
          <p>Already have an account? &nbsp;</p>
          <Link href="/login" underline="always">
            Login
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center items-center">
      <Spinner size="lg" />
    </div>
  )
}

export default Signup
