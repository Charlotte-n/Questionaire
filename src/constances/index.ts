//根据环境变量设置不同的baseURL
const BaseUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:7001'
        : 'https://egg.merikle.top'

export { BaseUrl }
