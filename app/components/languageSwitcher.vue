<template>
  <div class="inline-flex items-center bg-gray-100 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 border border-gray-200 dark:border-gray-700/50 shadow-sm">
    
    <!-- دکمه انگلیسی -->
    <NuxtButton
      label="EN"
      :color="!isFa ? 'primary' : 'gray'"
      :variant="!isFa ? 'solid' : 'ghost'"
      size="xs"
      @click="switchTo('en')"
      class="!rounded-full !font-bold transition-all duration-300"
    />

    <!-- دکمه فارسی -->
    <NuxtButton
      label="فا"
      :color="isFa ? 'primary' : 'gray'"
      :variant="isFa ? 'solid' : 'ghost'"
      size="xs"
      @click="switchTo('fa')"
      class="!rounded-full !font-bold transition-all duration-300"
    />
    
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n();

// تشخیص زبان فعلی
const isFa = computed(() => locale.value === 'fa');

// تابع تغییر زبان
const switchTo = (newLocale) => {
  if (locale.value === newLocale) return;
  
  setLocale(newLocale);
  
  // ۱. تغییر داینامیک جهت صفحه (Best Practice حیاتی برای RTL)
  document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.lang = newLocale;
  
  // ۲. تغییر فونت برای زبان فارسی (برای خوانایی بهتر)
  document.body.style.fontFamily = newLocale === 'fa' 
    ? 'Vazirmatn, system-ui, sans-serif' 
    : 'system-ui, -apple-system, sans-serif';
};

// تنظیم اولیه هنگام بارگذاری صفحه (برای جلوگیری از پرش محتوا)
onMounted(() => {
  document.documentElement.dir = isFa.value ? 'rtl' : 'ltr';
  document.documentElement.lang = locale.value;
  if (isFa.value) {
    document.body.style.fontFamily = 'Vazirmatn, system-ui, sans-serif';
  }
});
</script>