// config/appkit.ts
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  mainnet,
  sepolia,
  bsc,
  bscTestnet,
  polygon,
  polygonAmoy,
  arbitrum,
  arbitrumSepolia
} from '@reown/appkit/networks'

export const networks = [
  mainnet,
  sepolia,

  bsc,
  bscTestnet,

  polygon,
  polygonAmoy,

  arbitrum,
  arbitrumSepolia
]
export const projectId = "82672faa9189ce31e12460717a52960e";


export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});
