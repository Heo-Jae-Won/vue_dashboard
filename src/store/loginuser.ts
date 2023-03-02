import { defineStore } from "pinia";
import { computed, Ref, ref } from "vue";

export const useUserStore = defineStore(
  "loginUser",
  () => {
    const loginUser : Ref<string> = ref("");
    const getLoginUser = computed(() => loginUser.value);
    function changeLoginUser(payload: string) {
      loginUser.value = payload;
    }
    return { loginUser, getLoginUser, changeLoginUser };
  },
  {
    persist: true,
  }
);
