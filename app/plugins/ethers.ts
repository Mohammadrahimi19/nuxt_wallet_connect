import { defineNuxtPlugin } from "#app";
import { ethers } from "ethers";

export default defineNuxtPlugin(() => {
  // می‌تونی provider عمومی تعریف کنی (مثلاً برای خواندن داده‌ها از بلاک‌چین)
  const defaultProvider = new ethers.BrowserProvider(
    <Eip1193Provider>window.ethereum,
  );

  return {
    provide: {
      ethers,
      provider: defaultProvider,
    },
  };
});
