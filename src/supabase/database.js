import { createClient } from "@supabase/supabase-js"
import config from "../config/config"

export class DatabaseService {
    constructor() {
        this.client = createClient(
            config.supabaseUrl,
            config.supabaseProjectAPIKey
        )
    }

    async getStocks() {
        return await this.client.from("stocks").select().throwOnError()
    }

    async getWallet({ user_id }) {
        return await this.client
            .from("wallet")
            .select("*, wallet_transaction(*)")
            .eq("user_id", user_id)
            .single()
            .throwOnError()
    }

    async getPortfolio({ user_id }) {
        return await this.client
            .from("portfolio")
            .select("*, portfolio_transaction(*), portfolio_stocks(*)")
            .eq("user_id", user_id)
            .single()
            .throwOnError()
    }

    async walletTransact({ wallet_id, amount, type }) {
        return await this.client.rpc("create_wallet_transaction", {
            wallet_id,
            amount,
            type,
        })
    }

    async getStockData({ symbol }) {
        return await this.client
            .from("stock_data")
            .select()
            .eq("symbol", symbol)
            .maybeSingle()
    }

    async stockTransact({ uid, _symbol, operation, _quantity }) {
        return await this.client.rpc("stock_transaction", {
            uid,
            _symbol,
            operation,
            _quantity,
        })
    }

    async getPortfolioData({ uid }) {
        return this.client.rpc("get_portfolio", {
            uid,
        })
    }

    async resetAccount({ uid }) {
        return this.client.rpc("reset_account", {
            uid,
        })
    }

    async walletUpdate({ user_id, onUpdate }) {
        this.client
            .channel("wallet")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "wallet",
                    filter: `user_id=eq.${user_id}`,
                },
                () => onUpdate()
            )
            .subscribe()
    }

    async portfolioUpdate({ portfolio_id, onUpdate }) {
        this.client
            .channel("portfolio")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "wallet",
                    filter: `portfolio_id=eq.${portfolio_id}`,
                },
                () => onUpdate()
            )
            .subscribe()
    }

    async unsubscribeAll() {
        await this.client.removeAllChannels()
    }
}

const databaseService = new DatabaseService()

export default databaseService
