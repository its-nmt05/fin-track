import { createClient } from "@supabase/supabase-js"
import config from "../config/config"

export class AuthService {
    constructor() {
        this.client = createClient(
            config.supabaseUrl,
            config.supabaseProjectAPIKey
        )
    }

    async signup({ name, email, password }) {
        try {
            return await this.client.auth.signUp({
                email,
                password,
                options: { data: { name } },
            })
        } catch (error) {
            console.log(error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.client.auth.signInWithPassword({
                email,
                password,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async signout() {
        return await this.client.auth.signOut()
    }

    async getUser() {
        try {
            const {
                data: { user },
            } = await this.client.auth.getUser()

            return user
        } catch (error) {
            console.log(error)
        }
    }
}

const authService = new AuthService()

export default authService
