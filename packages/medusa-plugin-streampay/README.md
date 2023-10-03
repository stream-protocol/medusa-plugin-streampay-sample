# StreamPayment Processor

The StreamPayment Processor is a payment integration for Medusa Commerce that enables cryptocurrency and blockchain-based payments. This payment processor supports the Solana blockchain and various payment methods, including USDC, SOL, EURC, STRM, and more.

## Features

- Integration with Solana blockchain for secure and efficient cryptocurrency payments.
- Support for multiple payment methods, including USDC, SOL, EURC, STRM, and more.
- Customizable merchant transaction fees.
- Flexible configuration options.
- Robust error handling and transaction confirmation management.
- Real-time payment status tracking.

## Getting Started

### Installation

To install the StreamPay Payment Processor, follow these steps:

1. Clone this repository to your project:

```shell
git clone https://github.com/your-organization/stream-pay.git
```

2. Install the necessary dependencies:

```shell
npm install
```

3. Configure the payment processor by providing your Solana RPC endpoint, wallet keys, and other settings in the `streampay-base.ts` file.

### Usage

Here's how you can use the StreamPay Payment Processor in your Medusa Commerce project:

1. Initialize the payment processor with your Medusa instance and configuration.

```typescript
import { Medusa } from "@medusajs/medusa";
import StreamPayBase from "./streampay-base";

const medusa = new Medusa();
const streamPayConfig = {
  solanaRpcEndpoint: "https://your-solana-rpc-endpoint.com",
  payerWalletKeyPair: /* your payer wallet key pair */,
  userWalletKeyPair: /* your user wallet key pair */,
  usdcTokenAddress: "your-usdc-token-address",
  merchantTransactionFeePercentage: 1.5, // Customize the fee percentage
  // Add more configuration options
};

const streamPayProcessor = new StreamPayBase(medusa, streamPayConfig);
```

2. Implement payment authorization, capture, cancellation, and other payment-related logic using the provided methods.

```typescript
async function handlePaymentRequest() {
  try {
    // Payment authorization logic
    await streamPayProcessor.authorizePayment();

    // Payment capture logic
    // ...

    // Payment cancellation logic
    // ...
  } catch (error) {
    // Handle payment-related errors
  }
}
```

3. Use the payment processor to track payment statuses and handle transaction confirmations.

```typescript
async function handleTransaction(txId) {
  try {
    await streamPayProcessor.handleTransactionConfirmation(txId);
    // Update payment status or take further action
  } catch (error) {
    // Handle transaction confirmation errors
  }
}
```

### Configuration

You can customize the payment processor's behavior by modifying the configuration options in the `streampay-base.ts` file. Adjust settings such as the Solana RPC endpoint, confirmation thresholds, and more to fit your project's requirements.

### Testing

Thoroughly test the StreamPay Payment Processor in various scenarios, including mainnet, devnet, and testnet environments, to ensure reliability and correctness.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- [Medusa Commerce](https://medusa-commerce.com/)
- [StreamPayments™](https://)

An overview of the StreamPay Payment Processor, installation instructions, usage examples, configuration options, and license information. Customize it further based on your project's specifics and requirements.