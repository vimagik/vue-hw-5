import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";


export const useUserStore = defineStore('user', () => { 
    const username = ref('')
    const router = useRouter()
    
    function logout() {
        username.value = ''
    }

    function login(name) {
        username.value = name
        localStorage.setItem("user", name)
        router.push('/')
     }

    return { username, logout, login }
})