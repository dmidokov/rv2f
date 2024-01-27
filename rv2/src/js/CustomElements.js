import { defineCustomElement } from 'vue'
import userInfo from '../components/userInfo.ce.vue'

const UserInfoCustom = defineCustomElement(userInfo)

// export individual elements
export { UserInfoCustom }

export function register() {
    customElements.define('user-info', UserInfoCustom)
}