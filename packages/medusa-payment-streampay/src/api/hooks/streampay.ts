import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    SystemProgram,
  } from "@solana/web3.js";
  
  // Initialize the Solana connection (as shown in previous examples)
  const customSolanaRpcUrl = "https://rpc.streampayments.app";
  const connection = new Connection(customSolanaRpcUrl, "confirmed");
  
  // Define the token program's address (mainnet)
  const tokenProgramId = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
  
  // Example usage: Create a token account
  async function createTokenAccount(owner: PublicKey, mintPublicKey: PublicKey) {
    try {
      // Generate a new account for the token
      const newTokenAccount = new Account();
  
      // Create the transaction instruction to initialize the token account
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: owner,
          newAccountPubkey: newTokenAccount.publicKey,
          lamports: 1000000, // Initial balance (adjust as needed)
          space: 165, // Token account data size (fixed at 165 bytes)
          programId: tokenProgramId,
        }),
        Token.createInitAccountInstruction(
          tokenProgramId,
          mintPublicKey,
          newTokenAccount.publicKey,
          owner
        )
      );
  
      // Sign and send the transaction
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [owner, newTokenAccount],
        {
          commitment: "confirmed", // Adjust the commitment level as needed
          preflightCommitment: "confirmed",
        }
      );
  
      console.log("Token account created with signature:", signature);
    } catch (error) {
      console.error("Error creating token account:", error);
    }
  }
  
  // Example usage: Create a token account
  // Replace 'ownerPublicKey' with the public key of the account that will own the token account
  // Replace 'mintPublicKey' with the public key of the token's mint
  createTokenAccount(new PublicKey("ownerPublicKey"), new PublicKey("mintPublicKey"));
  