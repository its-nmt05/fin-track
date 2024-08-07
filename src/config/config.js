const config = {
    supabaseUrl: String(import.meta.env.VITE_SUPABASE_PROJECT_URL),
    supabaseProjectAPIKey: String(
        import.meta.env.VITE_SUPABASE_PROJECT_API_KEY
    ),
    stocksAPIKey: String(import.meta.env.VITE_STOCKS_API_KEY),
}

export default config
