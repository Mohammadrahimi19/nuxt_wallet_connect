import { ethers } from 'ethers'
import { contracts, isMainNet } from '@/composables/useMetaMask.js'
import { nextTick, ref } from 'vue'

const ETH_TEST_NET_RPC_URLS = [
  'https://ethereum-sepolia-rpc.publicnode.com',
  'https://rpc.sepolia.org',
  'https://sepolia.drpc.org',
]

const ETH_MAIN_NET_RPC_URLS = [
  'https://ethereum-rpc.publicnode.com',
  'https://eth.drpc.org',
  'https://rpc.ankr.com/eth',
]

export const sleep = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export const is_RPC_Failed = ref(false)

export const getProviderWithFallback = async () => {
  let urlsToTry = isMainNet
    ? [...ETH_MAIN_NET_RPC_URLS]
    : [...ETH_TEST_NET_RPC_URLS]

  while (true) {
    const results = await Promise.allSettled(
      urlsToTry.map(async (url) => {
        const provider = new ethers.JsonRpcProvider(url)
        await provider.getBlockNumber()
        return provider
      })
    )

    for (let i = 0; i < results.length; i++) {
      if (results[i].status === 'fulfilled') {
        is_RPC_Failed.value = false
        return results[i].value
      }

      console.error(
        `RPC failed: ${urlsToTry[i]}`,
        results[i].reason?.message
      )
    }

    is_RPC_Failed.value = true
    console.log('Retrying failed RPCs in 5 seconds...')
    await sleep(5000)

    urlsToTry = urlsToTry.filter((_, i) => results[i].status === 'rejected')
  }
}

const ETHER = 18

export const truncateDecimals = (num, decimals) =>
  parseFloat(Number(num).toFixed(decimals))

export const convertToEther = (data) =>
  ethers.parseUnits(data.toString(), ETHER)

export const humanReadableFromEther = (data) =>
  truncateDecimals(ethers.formatUnits(data, ETHER), 8)

// ----------------------- USDT Balance -----------------

export const user_usdt_balance = ref(0)
export const pending_usdt_user_balance = ref(false)

export const getUSDTUserBalance = async (account) => {
  if (!account) return

  pending_usdt_user_balance.value = true

  try {
    const provider = await getProviderWithFallback()

    const contract_usdt = new ethers.Contract(
      contracts.usdt,
      contracts.usdtABI,
      provider
    )

    await nextTick()

    let balance = await contract_usdt.balanceOf(account)
    balance = truncateDecimals(humanReadableFromEther(balance.toString()), 3)

    user_usdt_balance.value = balance
  } catch (e) {
    console.error('Unable to get USDT balance:', e)
    user_usdt_balance.value = 0
  } finally {
    pending_usdt_user_balance.value = false
  }
}

// ----------------------- SEC Balance -----------------

export const user_sec_balance = ref(0)
export const pending_sec_user_balance = ref(false)

export const getSECUserBalance = async (account) => {
  if (!account) return

  pending_sec_user_balance.value = true

  try {
    const provider = await getProviderWithFallback()

    const contract_sec = new ethers.Contract(
      contracts.SEC,
      contracts.SEC_ABI,
      provider
    )

    let balance = await contract_sec.balanceOf(account)
    balance = truncateDecimals(humanReadableFromEther(balance.toString()), 3)

    user_sec_balance.value = balance
  } catch (e) {
    console.error('Unable to get SEC balance:', e)
    user_sec_balance.value = 0
  } finally {
    pending_sec_user_balance.value = false
  }
}

// ----------------------- ETH Balance -----------------

export const eth_amount = ref(0)
export const pending_eth_balance = ref(false)

export const getUserEthBalance = async (account) => {
  if (!account) return

  pending_eth_balance.value = true

  try {
    const provider = await getProviderWithFallback()

    const balance = await provider.getBalance(account)

    eth_amount.value = humanReadableFromEther(balance.toString())
  } catch (e) {
    console.error('Unable to get ETH balance:', e)
    eth_amount.value = 0
  } finally {
    pending_eth_balance.value = false
  }
}

// ----------------------- All Balances -----------------

export const getUSDTandSecUserBalance = async (account) => {
  await Promise.allSettled([
    getUSDTUserBalance(account),
    getSECUserBalance(account),
    getUserEthBalance(account),
  ])
}