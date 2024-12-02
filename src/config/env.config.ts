import 'dotenv/config'

export const env = {
  database: {
    username: String(process.env.MONGO_INITDB_ROOT_USERNAME),
    password: String(process.env.MONGO_INITDB_ROOT_PASSWORD),
  },
  server: {
    port: Number(process.env.PORT || 3000),
  },
  environment: String(process.env.NODE_ENV || 'development') as 'development' | 'production',
}
