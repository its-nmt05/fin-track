import { createClient } from "@supabase/supabase-js"
import config from "../config/config"

export class DatabaseService {
    constructor() {
        this.client = createClient(
            config.supabaseUrl,
            config.supabaseProjectAPIKey
        )
    }

    async getWallet({ user_id, onPayload }) {
        // subscribe to wallet changes
        try {
            this.client
                .channel("schema-db-changes")
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: "wallet",
                        filter: `user_id=eq.${user_id}`,
                    },
                    (payload) => onPayload(payload.new)
                )
                .subscribe()
        } catch (error) {
            console.log(error)
        }

        try {
            return await this.client
                .from("wallet")
                .select()
                .eq("user_id", user_id)
                .single()
        } catch (error) {
            console.log(error)
        }
    }

    async walletTransact({ uid, amount }) {
        try {
            return await this.client.rpc("add_wallet_transaction", {
                uid,
                amount,
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
}

const databaseService = new DatabaseService()

export default databaseService
