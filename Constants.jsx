import * as dotenv from 'dotenv'
dotenv.config()

const prod = {
  url: {
    API_URL: 'https://odinwarden-server.herokuapp.com',
  },
}
const dev = {
  url: {
    API_URL: 'http://localhost:3000',
  },
}

const config = process.env.NODE_ENV === 'development' ? dev : prod

export { config }
