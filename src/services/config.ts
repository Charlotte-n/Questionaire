let BASE_URL = ''
const TIME_OUT = 2000
if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:7001/api'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'https://egg.hk.merikle.top/api'
}

export { BASE_URL, TIME_OUT }
