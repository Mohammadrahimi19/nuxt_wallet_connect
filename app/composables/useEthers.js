import { ethers } from 'ethers'
import { contracts, isMainNet } from '@/stores/useMetaMask.js'
import { nextTick, ref } from 'vue'
let signer

export const Provider = new ethers.BrowserProvider(window.ethereum)

export const getSigner = async () => {
  const ethereum = window.ethereum
  if (!ethereum) {
    throw new Error('MetaMask not found')
  }
  let accounts = await ethereum.request({ method: 'eth_accounts' })

  if (!accounts.length && !signer) {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' })
  }

  signer = Provider.getSigner()
  let block_number = await Provider.getBlockNumber()
  return { signer, block_number }
}

export const getICOContract = async () => {
  const { signer } = await getSigner()
  return new ethers.Contract(contracts.ICO, contracts.ICO_ABI, signer)
}
export const getUSDTContract = async () => {
  const { signer } = await getSigner()
  return new ethers.Contract(contracts.usdt, contracts.usdtABI, signer)
}
export const getLPContract = async () => {
  const { signer } = await getSigner()
  return new ethers.Contract(contracts.LP, contracts.LP_ABI, signer)
}
export const getSECContract = async () => {
  const { signer } = await getSigner()
  return new ethers.Contract(contracts.SEC, contracts.SEC_ABI, signer)
}
export const getRouterContract = async () => {
  const { signer } = await getSigner()
  const router_contract = new ethers.Contract(
    contracts.ROUTER_CONTRACT,
    contracts.CONTRACT_ABI_ROUTER,
    signer
  )
  return { router_contract }
}

// ✅ چند RPC مختلف
const TEST_NET_RPC_URLS = [
  'https://data-seed-prebsc-1-s1.binance.org:8545/',
  'https://bsc-testnet.nodereal.io/v1/9c812bc3d9c440d6b95a80cfe42000d2',
  'https://convincing-alpha-mansion.bsc-testnet.quiknode.pro/6bb032c7354d8511a736b012febb01f7068d0008/'
]

const MAIN_NET_RPC_URLS = [
  'https://bsc-mainnet.nodereal.io/v1/9c812bc3d9c440d6b95a80cfe42000d2',
  'https://rpc.ankr.com/bsc/32e82823c69b56ad1d96fcbb6d52308b70089683afaa9242fdf7a8e49736b444',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed.binance.org',
  'https://bsc-dataseed1.ninicoin.io'
]

// ✅ گرفتن provider با fallback

export const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms))
export const is_RPC_Failed = ref(false)
export const getProviderWithFallback = async () => {
  let urlsToTry = isMainNet ? [...MAIN_NET_RPC_URLS] : [...TEST_NET_RPC_URLS]

  while (true) {
    // تست همه RPCهای موجود همزمان
    const results = await Promise.allSettled(
      urlsToTry.map(async (url) => {
        const provider = new ethers.JsonRpcProvider(url)
        await provider.getBlockNumber() // تست اتصال
        return provider
      })
    )

    // بررسی نتایج
    for (let i = 0; i < results.length; i++) {
      if (results[i].status === 'fulfilled') {
        // console.log(`✅ Connected to RPC: ${urlsToTry[i]}`)
        is_RPC_Failed.value = false
        return results[i].value
      } else {
        console.error(`❌ RPC failed: ${urlsToTry[i]}`, results[i].reason.message)
      }
    }

    // اگر همه fail شدن، retry بعد از 5 ثانیه
    is_RPC_Failed.value = true
    console.log('Retrying failed RPCs in 5 seconds...')
    await sleep(5000)

    // فقط  RPC هایی که fail شدن دوباره امتحان میشن
    urlsToTry = urlsToTry.filter((_, i) => results[i].status === 'rejected')
  }
}

const ETHER = 18
export const truncateDecimals = (num, decimals) => parseFloat(Number(num).toFixed(decimals))
export const convertToEther = (data) => ethers.parseUnits(data.toString(), ETHER)
export const humanReadableFromEther = (data) => truncateDecimals(ethers.formatUnits(data, ETHER), 8)

// -----------------------balance -----------------

export const user_usdt_balance = ref(0)
export const pending_usdt_user_balance = ref(false)

export const getUSDTUserBalance = async (account) => {
  if (!account) return

  pending_usdt_user_balance.value = true
  try {
    const provider_usdt = await getProviderWithFallback() // test net
    const contract_usdt = new ethers.Contract(contracts.usdt, contracts.usdtABI, provider_usdt)
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

export const user_sec_balance = ref(0)
export const pending_sec_user_balance = ref(false)

export const getSECUserBalance = async (account) => {
  if (!account) return

  pending_sec_user_balance.value = true
  try {
    const SEC_provider = await getProviderWithFallback()
    const contract_sec = new ethers.Contract(contracts.SEC, contracts.SEC_ABI, SEC_provider)

    let balance = await contract_sec.balanceOf(account)
    balance = truncateDecimals(humanReadableFromEther(balance.toString()), 3)
    user_sec_balance.value = balance
  } catch (e) {
    console.error('Unable to get USDT balance:', e)
    user_sec_balance.value = 0
  } finally {
    pending_sec_user_balance.value = false
  }
}

export const getUSDTandSecUserBalance = async (account) => {
  await Promise.allSettled([
    getUSDTUserBalance(account),
    getSECUserBalance(account),
    getUserBnbBalance(account)
  ])
}

export const bnb_amount = ref()
export const getUserBnbBalance = async (account) => {
  if (!account) return
  try {
    const provider = await getProviderWithFallback()
    bnb_amount.value = await provider.getBalance(account)
    bnb_amount.value = humanReadableFromEther(bnb_amount.value.toString())
  } catch (e) {
    throw new Error(`Error getting balance ${e}`)
  }
}
//----------------------------------------
