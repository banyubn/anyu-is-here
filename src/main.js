import { createApp } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import App from "./App.vue"
import router from "./router"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const app = createApp(App)
app.use(router)
app.mount("#app")
