import { createClient } from "@supabase/supabase-js"
import config from "../config/config"

export class DatabaseService {
    constructor() {
        this.client = createClient(
            config.supabaseUrl,
            config.supabaseProjectAPIKey
        )
    }

    async getWallet({ user_id }) {
        try {
            return await this.client
                .from("wallet")
                .select("*, wallet_transaction(*)")
                .eq("user_id", user_id)
                .single()
        } catch (error) {
            console.log(error)
        }
    }

    async walletTransact({ wallet_id, amount, type }) {
        try {
            return await this.client.rpc("create_wallet_transaction", {
                wallet_id,
                amount,
                type,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getStocks() {
        try {
            return await this.client.from("stocks").select()
        } catch (error) {
            console.log(error)
        }
    }

    async getStockData({ symbol }) {
        try {
            return await this.client
                .from("stock_data")
                .select()
                .eq("symbol", symbol)
                .maybeSingle()
        } catch (error) {
            console.log(error)
        }
    }

    async stockTransact({ uid, _symbol, operation, quantity }) {
        try {
            return await this.client.rpc("stock_transaction", {
                uid,
                _symbol,
                operation,
                quantity,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getPortfolio({ user_id }) {
        try {
            return await this.client
                .from("portfolio")
                .select("*, portfolio_transaction(*)")
                .eq("user_id", user_id)
                .single()
        } catch (error) {
            console.log(error)
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService
