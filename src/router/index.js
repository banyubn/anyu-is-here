import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import Programming from "../pages/Programming.vue"
import VideoEditing from "../pages/VideoEditing.vue"
import MusicProduction from "../pages/MusicProduction.vue"
import Certificates from "../pages/Certificates.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/programming",
    name: "Programming",
    component: Programming,
  },
  {
    path: "/video-editing",
    name: "VideoEditing",
    component: VideoEditing,
  },
  {
    path: "/music-production",
    name: "MusicProduction",
    component: MusicProduction,
  },
  {
    path: "/certificates",
    name: "Certificates",
    component: Certificates,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
