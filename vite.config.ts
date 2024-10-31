import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeConsole from 'vite-plugin-remove-console'
import { visualizer } from 'rollup-plugin-visualizer'
import PurgeIcons from 'vite-plugin-purge-icons'

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
    ],
    build: {
        terserOptions: {
            format: {
                comments: false,
            },
        },
        chunkSizeWarningLimit: 500, // 单位kb
        rollupOptions: {
            output: {
                manualChunks: {
                    react: [
                        'react',
                        'react-dom',
                        'react-router-dom',
                        'redux',
                        'react-redux',
                    ],
                    rightEdit: [],
                },
            },
        },
    },
})
