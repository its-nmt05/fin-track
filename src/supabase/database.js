import { createClient } from "@supabase/supabase-js"
import config from "../config/config"

export class DatabaseService {
    constructor() {
        this.client = createClient(
            config.supabaseUrl,
            config.supabaseProjectAPIKey
        )
    }

    async getWallets({ user_id }) {
        try {
            return await this.client
                .from("wallet")
                .select()
                .eq("user_id", user_id)
        } catch (error) {
            console.log(error)
        }
    }

    async createWallet({ name, color, balance, user_id }) {
        try {
            await this.client
                .from("wallet")
                .insert({ name, color, balance, user_id })
        } catch (error) {
            console.log(error)
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService
