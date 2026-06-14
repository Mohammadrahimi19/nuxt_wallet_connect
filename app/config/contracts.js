export default {
  usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // آدرس قرارداد USDT (مثال: اتریوم اصلی)
  usdtABI: [
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  ICO: "0x_ADDRESS_OF_YOUR_ICO_CONTRACT"
};