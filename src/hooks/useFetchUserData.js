import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import authService from "../supabase/auth"
import { clearUser, setUser } from "../store/slice/authSlice"
import { fetchStocks } from "../store/slice/stockSlice"
import {
    fetchPortfolio,
    onPortfolioUpdate,
} from "../store/slice/portfolioSlice"
import { fetchWallet, onWalletUpdate } from "../store/slice/walletSlice"
import databaseService from "../supabase/database"

const useFetchUserData = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await authService.getUser()
            if (data?.user) {
                const user_id = data.user.id
                dispatch(setUser(data))
                dispatch(fetchStocks())
                dispatch(fetchPortfolio(user_id))
                dispatch(fetchWallet(user_id))

                // listen for realtime updates on portfolio and wallet
                dispatch(onWalletUpdate(user_id))
                dispatch(onPortfolioUpdate(user_id))
            } else {
                navigate("/login")
                dispatch(clearUser())
            }
            setIsLoading(false)
        }
        fetchData()

        return () => {
            databaseService.unsubscribeAll() // unsub all realtime listeners
        }
    }, [])

    return isLoading
}

export default useFetchUserData
