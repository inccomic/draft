import { defineElement } from "zipaper"
import template from "./index.html"
import style from "./index.scss"

import { Canvas } from "vislite"

export default defineElement({
    template,
    data() {
        return {

        }
    },
    methods: {

    },
    created() {
        let painter = new Canvas(document.getElementById("root"))

        console.log(painter )
    },
    style: {
        content: style
    }
})