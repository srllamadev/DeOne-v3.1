import {
  Keypair,
  Horizon,
  Networks,
  TransactionBuilder,
  Operation,
  Asset,
  Memo,
  BASE_FEE,
} from "@stellar/stellar-sdk";
import { loadEnv } from "../../config/env.js";
import { AppError } from "../../middleware/errorHandler.js";

export interface WalletInfo {
  publicKey: string;
  secretKey: string;
}

export interface Balance {
  assetType: string;
  assetCode?: string;
  assetIssuer?: string;
  balance: string;
}

export interface TransactionRecord {
  id: string;
  hash: string;
  type: string;
  createdAt: string;
  sourceAccount: string;
  memo?: string;
}

export function generateWallet(): WalletInfo {
  const keypair = Keypair.random();
  return {
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret(),
  };
}

export async function getBalances(publicKey: string): Promise<Balance[]> {
  const env = loadEnv();
  const server = new Horizon.Server(env.STELLAR_HORIZON_URL);

  try {
    const account = await server.accounts().accountId(publicKey).call();
    return account.balances.map((b) => ({
      assetType: b.asset_type,
      assetCode: "asset_code" in b ? b.asset_code : undefined,
      assetIssuer: "asset_issuer" in b ? b.asset_issuer : undefined,
      balance: b.balance,
    }));
  } catch (err: unknown) {
    const error = err as { response?: { status?: number } };
    if (error.response?.status === 404) {
      throw new AppError("Cuenta no encontrada en la red Stellar", 404);
    }
    throw err;
  }
}

export async function getTransactionHistory(publicKey: string, limit = 20): Promise<TransactionRecord[]> {
  const env = loadEnv();
  const server = new Horizon.Server(env.STELLAR_HORIZON_URL);

  const response = await server
    .operations()
    .forAccount(publicKey)
    .order("desc")
    .limit(limit)
    .call();

  return response.records.map((op) => ({
    id: op.id,
    hash: op.transaction_hash,
    type: op.type,
    createdAt: op.created_at,
    sourceAccount: op.source_account,
    memo: "memo" in op ? String(op.memo) : undefined,
  }));
}

export async function fundTestnet(publicKey: string): Promise<string> {
  const env = loadEnv();

  if (env.STELLAR_NETWORK !== "TESTNET") {
    throw new AppError("El funding automatico solo funciona en Testnet", 400);
  }

  const response = await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`,
  );

  const data = await response.json() as { hash?: string; error?: string };

  if (!response.ok) {
    throw new AppError(data.error ?? "Error al fondear la cuenta", 502);
  }

  return data.hash ?? "";
}

export async function sendPayment(params: {
  secretKey: string;
  toPublicKey: string;
  amount: string;
  asset?: string;
  memo?: string;
}): Promise<string> {
  const env = loadEnv();
  const server = new Horizon.Server(env.STELLAR_HORIZON_URL);

  const sourceKeypair = Keypair.fromSecret(params.secretKey);
  const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

  const asset =
    !params.asset || params.asset === "XLM"
      ? Asset.native()
      : new Asset(params.asset, sourceKeypair.publicKey());

  const builder = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: env.STELLAR_NETWORK === "TESTNET" ? Networks.TESTNET : Networks.PUBLIC,
  })
    .addOperation(
      Operation.payment({
        destination: params.toPublicKey,
        asset,
        amount: params.amount,
      }),
    )
    .setTimeout(30);

  if (params.memo) {
    builder.addMemo(Memo.text(params.memo));
  }

  const tx = builder.build();
  tx.sign(sourceKeypair);

  const result = await server.submitTransaction(tx);
  return result.hash;
}
