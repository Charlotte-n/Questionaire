import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeConsole from 'vite-plugin-remove-console'
import { visualizer } from 'rollup-plugin-visualizer'
import PurgeIcons from 'vite-plugin-purge-icons'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        //删除console
        removeConsole({
            includes: ['log'],
        }),
        //分析哪些文件比较大,会有一个图片来分析哪个文件大
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
        //移除未使用的css
        PurgeIcons(),
        //压缩图片
        viteCompression({
            verbose: true, // 是否在控制台中输出压缩结果
            disable: false,
            threshold: 1024 * 500, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
            algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
            ext: '.gz',
            deleteOriginFile: true, // 源文件压缩后是否删除(我为了看压缩后的效果，先选择了true)
        }),
    ],
    build: {
        terserOptions: {
            format: {
                comments: false,
            },
        },
        chunkSizeWarningLimit: 500, // 单位kb
        //拆分thunk
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
                manualChunks: {
                    react: [
                        'react',
                        'react-dom',
                        'redux',
                        'react-router-dom',
                        'react-redux',
                    ],
                    lodash: ['lodash-es'],
                    antd: ['antd'],
                    html2canvas: ['html2canvas'],
                    cropper: ['cropperjs'],
                },
            },
        },
    },
})
