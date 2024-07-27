import { useDispatch, useSelector } from "react-redux"
import authService from "../supabase/auth"
import { clearUser, setUser } from "../store/authSlice"

const useAuth = () => {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.auth.status)
    const user = useSelector((state) => state.auth.user)

    const signup = async (userData) => {
        const { data, error } = await authService.signup(userData)
        if (data.user) dispatch(setUser(data))
        return { error }
    }

    const login = async (userData) => {
        const { data, error } = await authService.login(userData)
        if (data.user) dispatch(setUser(data))
        return { error }
    }

    const logout = async () => {
        const { error } = await authService.signout()
        if (!error) dispatch(clearUser())
    }

    return { status, user, signup, login, logout }
}

export default useAuth
