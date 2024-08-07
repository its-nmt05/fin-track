import React, { useState } from "react"
import { Button, Input, Link, Spinner } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import useAuth from "../hooks/useAuth"
import Logo from "../static/logo/Logo"

function Login() {
  const { login } = useAuth()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const loginUser = async (userData) => {
    setIsLoading(true)
    const { error } = await login(userData)
    setError(error?.message)
    setIsLoading(false)
  }

  return !isLoading ? (
    <div className="flex flex-col h-screen justify-center px-8">
      <div>
        <Logo className="mx-auto w-auto" size={16} />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 mb-2" onSubmit={handleSubmit(loginUser)}>
          <Input
            autoFocus
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
            Login
          </Button>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>
        <div className="flex items-center justify-center">
          <p>Don&apos;t have any account? &nbsp;</p>
          <Link href="/signup" underline="always">
            Sign up
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

export default Login
