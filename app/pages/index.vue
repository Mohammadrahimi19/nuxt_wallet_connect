<template>
  <div class="min-h-[100dvh] flex flex-col justify-center items-center p-4 bg-gray-50 dark:bg-[#020420] transition-colors duration-300">
    
    <!-- هدر با سوئیچ زبان -->
    <LanguageSwitcher  />
    <div class="w-full max-w-md flex justify-between items-center mb-6">
      <nuxt-separator icon="i-simple-icons-nuxtdotjs" />
    </div>

    <!-- عنوان -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('app.title') }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ t('app.subtitle') }}</p>
    </div>

    <!-- کارت اصلی -->
    <nuxt-card class="w-full max-w-md shadow-xl border-0 ring-1 ring-gray-200 dark:ring-gray-700/50 overflow-hidden">
      
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <UIcon name="i-lucide-wallet" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('wallet.title') }}</h2>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ accountData.address ? t('wallet.connected') : t('wallet.disconnected') }}
              </p>
            </div>
          </div>
          <span class="flex h-3 w-3 relative" :class="accountData.address ? 'text-green-500' : 'text-gray-400'">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="accountData.address ? 'bg-green-400' : 'bg-gray-300'"></span>
            <span class="relative inline-flex rounded-full h-3 w-3" :class="accountData.address ? 'bg-green-500' : 'bg-gray-400'"></span>
          </span>
        </div>
      </template>

      <template #default>
        <div class="py-4 min-h-[120px] flex flex-col justify-center">
          <div v-if="accountData.address" class="space-y-4">
            <div class="bg-gray-100  dark:bg-gray-800/50 rounded-lg p-3 flex items-center justify-between group">
              <div class="flex items-center gap-2 overflow-hidden">
                <UIcon name="i-lucide-user-circle" class="w-5 h-5 text-gray-500 shrink-0" />
                <span class="font-mono text-sm text-gray-800 dark:text-gray-200 truncate" dir="ltr">
                  {{ truncatedAddress }}
                </span>
              </div>
              <nuxt-button 
                icon="i-lucide-copy" 
                size="2xs" 
                color="gray" 
                variant="ghost"
                @click="copyAddress"
                class="opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
              />
            </div>
            
            <div v-if="isApproved" class="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5" />
              <span class="text-sm font-medium">{{ t('actions.approved') }}</span>
            </div>
          </div>

          <div v-else class="text-center py-6">
            <UIcon name="i-lucide-unplug" class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ t('wallet.notConnectedDesc') }}
            </p>
          </div>
        </div>
      </template>

      <template #footer>
        <client-only>
          <div class="flex flex-col gap-3">
            <div class="w-full flex justify-center">
              <appkit-button />
            </div>
<!-- 
            <nuxt-button
              v-if="accountData.address"
              color="success"
              block
              size="lg"
              icon="i-lucide-rocket"
              :label="pending_approve ? t('actions.processing') : t('actions.approve')"
              :loading="pending_approve"
              :disabled="pending_approve"
              class="mt-2"
              @click="usdtApprove"
              /> -->
          </div>
        </client-only>
      </template>
    </nuxt-card>

    <p class="text-xs text-gray-400 mt-6 text-center">{{ t('footer') }}</p>
  </div>
</template>
<script setup>
// ==========================================
// Imports
// ==========================================
import { networks, projectId, wagmiAdapter } from '@/config/appkit.js'
import { convertToEther } from '~/composables/useEthers.js'
import {
  createAppKit,
  useAppKitAccount,
  useAppKitEvents,
} from '@reown/appkit/vue'

// ==========================================
// Nuxt & I18n Setup
// ==========================================
const { $ethers } = useNuxtApp()
const { t } = useI18n()
const toast = useToast()

// ==========================================
// Reown AppKit Initialization
// ==========================================
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'AppKit Nuxt Wagmi Example',
    description: 'AppKit Nuxt Wagmi Example',
    url: 'https://reown.com/appkit',
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4'],
  },
})

// ==========================================
// AppKit Account & Events
// ==========================================
const accountData = useAppKitAccount()
const eventWallet = useAppKitEvents()

// ==========================================
// Reactive State
// ==========================================
const pending_approve = ref(false)
const isApproved = ref(false)

// ==========================================
// Computed Properties
// ==========================================
const walletAddress = computed(() => {
    console.log(accountData.value);
    
  return accountData.value.address || ''
})

const isWalletConnected = computed(() => {
  return !!walletAddress.value
})

const truncatedAddress = computed(() => {
  const address = walletAddress.value

  if (!address) return ''

  return `${address.slice(0, 6)}...${address.slice(-4)}`
})

// ==========================================
// Helper Functions
// ==========================================
const getSigner = async () => {
  const rawProvider = await appKit.getWalletProvider('eip155')

  if (!rawProvider) {
    throw new Error('Wallet provider not found')
  }

  const provider = new $ethers.BrowserProvider({
    request: (args) => rawProvider.request(args),
  })

  return await provider.getSigner()
}

const copyAddress = async () => {
  const address = walletAddress.value

  if (!address) return

  try {
    await navigator.clipboard.writeText(address)

    toast.add({
      title: t('wallet.copySuccess'),
      description: t('wallet.copySuccessDesc'),
      icon: 'i-lucide-check',
      color: 'success',
      timeout: 2000,
    })
  } catch (err) {
    toast.add({
      title: t('wallet.copyError'),
      description: t('wallet.copyErrorDesc'),
      color: 'error',
    })
  }
}

// ==========================================
// Transaction Handlers
// ==========================================
const usdtApprove = async () => {
  if (!isWalletConnected.value) {
    toast.add({
      title: t('wallet.disconnected'),
      description: t('wallet.notConnectedDesc'),
      icon: 'i-lucide-unplug',
      color: 'warning',
    })

    return
  }

  pending_approve.value = true
  isApproved.value = false

  try {
    const signer = await getSigner()

    const contract = new $ethers.Contract(
      contracts.usdt,
      contracts.usdtABI,
      signer
    )

    const tx = await contract.approve(
      contracts.ICO,
      convertToEther(1)
    )

    toast.add({
      title: t('toast.txSent'),
      description: `${t('toast.txSentDesc')} (Tx: ${tx.hash.slice(0, 10)}...)`,
      icon: 'i-lucide-clock',
      timeout: 5000,
    })

    await tx.wait()

    isApproved.value = true

    toast.add({
      title: t('toast.success'),
      description: t('toast.successDesc'),
      icon: 'i-lucide-check-circle',
      color: 'success',
    })

    console.log('Approved tx-hash:', tx.hash)
  } catch (e) {
    await txErrorHandler(e)
  } finally {
    pending_approve.value = false
  }
}

const txErrorHandler = async (e) => {
  console.error('Transaction Error:', e)

  if (e.code === 'ACTION_REJECTED' || e.code === 4001) {
    toast.add({
      title: t('toast.cancelled'),
      description: t('toast.cancelledDesc'),
      icon: 'i-lucide-x-circle',
      color: 'warning',
    })

    return
  }

  toast.add({
    title: t('toast.error'),
    description: e.reason || e.shortMessage || e.message || 'Unknown error',
    icon: 'i-lucide-alert-triangle',
    color: 'error',
  })
}

// ==========================================
// Watchers
// ==========================================
watch(
  eventWallet,
  (event) => {
    console.log('Wallet Event:', event?.data?.event)
  },
  { deep: true }
)
</script>