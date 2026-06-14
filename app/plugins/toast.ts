// plugins/1.vue-query.ts
import { defineNuxtPlugin } from "#imports";
export default defineNuxtPlugin((nuxt) => {
  const toast = useToast();

  return {
    provide: {
      toast,
    },
  };
});
