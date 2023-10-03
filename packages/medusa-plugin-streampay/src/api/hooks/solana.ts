// src/api/hooks/solana.ts

import { Connection, PublicKey } from "@solana/web3.js";

// Initialize a connection to the Solana network
export function initializeSolanaConnection(): Connection {
  const rpcUrl = "https://api.mainnet-beta.solana.com"; 
  const connection = new Connection(rpcUrl, "confirmed");
  return connection;
}

// Example function to fetch Solana account balance
export async function fetchSolanaAccountBalance(
  publicKey: PublicKey
): Promise<number> {
  const connection = initializeSolanaConnection();

  try {
    const balance = await connection.getBalance(publicKey);
    return balance;
  } catch (error) {
    console.error("Error fetching Solana account balance:", error);
    throw error;
  }
}

// Other Solana-related hooks or utilities can be added here
