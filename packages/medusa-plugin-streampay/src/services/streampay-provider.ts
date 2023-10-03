import {
  MedusaProvider,
  MedusaProviderContext,
  MedusaProviderError,
  PaymentSessionData,
  PaymentSessionStatus,
} from "@medusajs/medusa";
import { Connection, Transaction, SystemProgram } from "@solana/web3.js";

class StreamPayProvider implements MedusaProvider {
  name = "streampay";
  connection: Connection;

  constructor(rpcEndpoint: string) {
    this.connection = new Connection(rpcEndpoint);
  }

  async createPaymentSession(
    context: MedusaProviderContext
  ): Promise<PaymentSessionData | MedusaProviderError> {
    try {
      const sessionId = "generate_unique_session_id";
      const paymentAmount = context.amount;
      const merchantFee = (paymentAmount * 1.5) / 100;
      const totalAmount = paymentAmount + merchantFee;

      const paymentSessionData: PaymentSessionData = {
        session_id: sessionId,
        status: PaymentSessionStatus.Pending,
        amount: totalAmount,
        payment_method: context.paymentMethod, // Allow user to specify payment method
        merchant_wallet: context.merchantWallet, // Allow user to specify merchant wallet
        merchant_fee: merchantFee,
        network: context.solanaNetwork,
      };

      // Store the payment session data or perform other necessary actions

      return paymentSessionData;
    } catch (error) {
      console.error("Failed to create payment session:", error);
      return {
        error: "Failed to create payment session",
      };
    }
  }

  async authorizePayment(
    sessionData: PaymentSessionData
  ): Promise<PaymentSessionData | MedusaProviderError> {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: context.sellerPublicKey,
          toPubkey: context.receiverPublicKey,
          lamports: sessionData.amount,
        })
      );

      const signature = await this.connection.sendTransaction(
        transaction,
        [context.sellerWallet],
        {
          skipPreflight: false,
        }
      );

      sessionData.status = PaymentSessionStatus.Authorized;
      sessionData.transactionSignature = signature;

      return sessionData;
    } catch (error) {
      console.error("Payment authorization failed:", error);
      return {
        error: "Payment authorization failed",
      };
    }
  }

  async capturePayment(
    sessionData: PaymentSessionData
  ): Promise<PaymentSessionData | MedusaProviderError> {
    try {
      // Implement payment capture logic using Solana
      // This step confirms the authorized transaction

      // Example:
      const confirmation = await this.connection.confirmTransaction(
        sessionData.transactionSignature
      );

      if (confirmation.value?.err) {
        console.error("Payment capture failed:", confirmation.value.err);
        return {
          error: "Payment capture failed",
        };
      }

      sessionData.status = PaymentSessionStatus.Captured;

      return sessionData;
    } catch (error) {
      console.error("Payment capture failed:", error);
      return {
        error: "Payment capture failed",
      };
    }
  }

  async cancelPayment(
    sessionData: PaymentSessionData
  ): Promise<PaymentSessionData | MedusaProviderError> {
    try {
      // Implement payment cancellation logic using Solana
      // This step reverses the authorized transaction

      // Example:
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: context.receiverPublicKey,
          toPubkey: context.sellerPublicKey,
          lamports: sessionData.amount,
        })
      );

      const signature = await this.connection.sendTransaction(
        transaction,
        [context.receiverWallet],
        {
          skipPreflight: false,
        }
      );

      sessionData.status = PaymentSessionStatus.Canceled;

      return sessionData;
    } catch (error) {
      console.error("Payment cancellation failed:", error);
      return {
        error: "Payment cancellation failed",
      };
    }
  }

  // Implement methods for other payment methods like SOL, EURC, and STRM as needed
}

export default StreamPayProvider;
