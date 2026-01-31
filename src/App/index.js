import { defineElement } from "zipaper"
import template from "./index.html"
import style from "./index.scss"

import { Canvas } from "vislite"

let painter
export default defineElement({
    template,
    data() {
        return {

        }
    },
    methods: {
        clear() {
            painter.clear()
        },
        download() {
            painter.toDataURL().then(dataURL => {
                const link = document.createElement('a')
                link.href = dataURL
                link.download = 'drawing.png'
                link.click()
            });
        },
        colorInput(event){
            painter.config({ strokeStyle: event.target.value })
        },
        sizeInput(event){
            painter.config({ lineWidth: event.target.value })
        }
    },
    created() {
        painter = new Canvas(document.getElementById('canvas-wrap'))

        const colorInput = document.getElementById('color')
        const sizeInput = document.getElementById('size')

        // 初始化配置
        painter.config({
            strokeStyle: colorInput.value,
            lineWidth: sizeInput.value
        })

        let isDrawing = false
        painter.bind("mousedown", (_, x, y) => {
            isDrawing = true
            painter.beginPath()
        })
        painter.bind("mouseup", (_, x, y) => {
            isDrawing = false
            painter.closePath()
        })
        painter.bind("mousemove", (_, x, y) => {
            if (!isDrawing) return
            painter.lineTo(x, y)
            painter.stroke()
        })

    },
    style: {
        content: style
    }
})