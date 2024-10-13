let BASE_URL = ''
const TIME_OUT = 1000
if (process.env.NODE_ENV === 'development') {
    BASE_URL = ''
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'https://egg.hk.merikle.top'
}

export { BASE_URL, TIME_OUT }
