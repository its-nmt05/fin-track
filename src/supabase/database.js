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
                .select()
                .eq("user_id", user_id)
        } catch (error) {
            console.log(error)
        }
    }

    async walletTransact({ id, amount }) {
        try {
            return await this.client.rpc("add_wallet_transaction", {
                id,
                amount,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService
