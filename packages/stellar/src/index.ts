export const STELLAR_NETWORKS = {
  TESTNET: {
    name: "Testnet",
    horizonUrl: "https://horizon-testnet.stellar.org",
    sorobanRpcUrl: "https://soroban-testnet.stellar.org",
    networkPassphrase: "Test SDF Network ; September 2015",
  },
  MAINNET: {
    name: "Mainnet",
    horizonUrl: "https://horizon-futurenet.stellar.org",
    sorobanRpcUrl: "https://soroban-rpc.mainnet.stellar.gateway.fm",
    networkPassphrase: "Public Global Stellar Network ; September 2015",
  },
} as const;

export type StellarNetworkName = keyof typeof STELLAR_NETWORKS;

export function getNetworkConfig(network: StellarNetworkName = "TESTNET") {
  return STELLAR_NETWORKS[network];
}

export function isValidStellarAddress(address: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(address) && address.length === 56;
}

export function shortenAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
