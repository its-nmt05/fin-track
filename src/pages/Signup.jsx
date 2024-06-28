import React, { useState } from "react"
import { Button, Input, Link, user } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import authService from "../supabase/auth"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login as authLogin } from "../store/authSlice"

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [error, setError] = useState(null)
  const { register, handleSubmit } = useForm("")

  const signup = async (userData) => {
    const { data, error } = await authService.signup(userData)

    if (data.user) {
      dispatch(authLogin(data.user))
      navigate("/")
    }
    setError(error?.message)
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to FinTrack
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 mb-2" onSubmit={handleSubmit(signup)}>
            <Input
              isRequired
              label="Name"
              placeholder="Enter your full name"
              labelPlacement="outside"
              radius="sm"
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
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </form>
          <div className="flex items-center justify-center">
            <p>Already have an account? &nbsp;</p>
            <Link href="/login" underline="always">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
