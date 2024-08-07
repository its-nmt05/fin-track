import authService from "./auth"

export class DatabaseService {
    constructor() {
        this.client = authService.client
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

    // fetch portfolio data and portfolio transactions
    async getPortfolio({ user_id }) {
        return await Promise.all([
            this.client
                .from("portfolio_data")
                .select()
                .eq("user_id", user_id)
                .throwOnError(),
            this.client
                .from("portfolio")
                .select("*, portfolio_transaction(*)")
                .eq("user_id", user_id)
                .single()
                .throwOnError(),
        ])
    }

    async walletTransact({ uid, amount, type }) {
        return await this.client.rpc("create_wallet_transaction", {
            uid,
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

    async getStockPrices({ symbol, start }) {
        return await this.client
            .from("stock_prices")
            .select()
            .eq("symbol", symbol)
            .gt("time", start)
            .order("time", { ascending: true })
    }

    async stockTransact({ uid, _symbol, operation, _quantity }) {
        return await this.client.rpc("stock_transaction", {
            uid,
            _symbol,
            operation,
            _quantity,
        })
    }

    // reset all user data
    async resetAccount({ uid }) {
        return this.client.rpc("reset_account", {
            uid,
        })
    }

    async getAppData({ section }) {
        return this.client
            .from("app_data")
            .select()
            .eq("section", section)
            .single()
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

    async portfolioUpdate({ onUpdate }) {
        const portfolio_id = "6fb31c1b-c42e-4c43-8b00-a1edf27e218c"
        this.client
            .channel("portfolio")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "portfolio_stocks",
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
