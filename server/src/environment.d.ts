declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number
            DB_URL: string
            SMTP_HOST: string;
            SMTP_PORT: number;
            SMTP_USER: string;
            SMTP_PASS: string;
            FORGOT_PASSWORD_EXPIRY: number
            NODE_ENV: "developement" | "production"
        }
    }
}

export { }