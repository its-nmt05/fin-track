import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
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
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const dataLoaded = useRef(false) // keep track of loading the data

    useEffect(() => {
        const dispatchData = (user) => {
            if (!user) return
            const user_id = user.id
            dataLoaded.current = true

            dispatch(setUser(user))
            dispatch(fetchStocks())
            dispatch(fetchPortfolio(user_id))
            dispatch(fetchWallet(user_id))

            // listen for realtime updates on portfolio and wallet
            dispatch(onWalletUpdate(user_id))
            dispatch(onPortfolioUpdate(user_id))
        }

        // listening to auth state changes
        const sub = authService.onAuthChange((event, session) => {
            const user = session?.user
            if (user && !dataLoaded.current) {
                dispatchData(user)
            }
        })

        const fetchData = async () => {
            const user = await authService.getUser()
            user ? dispatch(setUser(user)) : dispatch(clearUser())
            dispatchData(user)
            setIsLoading(false)
        }
        fetchData()

        return () => {
            databaseService.unsubscribeAll() // unsub all realtime listeners
            sub?.subscription?.unsubscribe() // unsub auth state change listener
        }
    }, [])

    return isLoading
}

export default useFetchUserData
