# StreamPay Plugin for Medusa Commerce

The StreamPay Plugin is an integration for [Medusa Commerce](https://medusa-commerce.com/) that enables cryptocurrency and blockchain-based payments. This plugin provides support for the Solana blockchain and various payment methods, including USDC, SOL, EURC, STRM, and more.

## Features

- Seamless integration with Medusa Commerce.
- Integration with the Solana blockchain for secure and efficient cryptocurrency payments.
- Support for multiple payment methods, including USDC, SOL, EURC, STRM, and more.
- Customizable merchant transaction fees.
- Flexible configuration options.
- Robust error handling and transaction confirmation management.
- Real-time payment status tracking.

## Installation

To install the StreamPay Plugin for Medusa Commerce, follow these steps:

1. Install the plugin via npm or yarn:

```shell
npm install @streampay/medusa-plugin-streampay
```

2. Configure the plugin by providing your Solana RPC endpoint, wallet keys, and other settings in your Medusa project configuration.

3. Implement payment authorization, capture, cancellation, and other payment-related logic using the provided methods and components.

4. Thoroughly test the plugin in various scenarios, including mainnet, devnet, and testnet environments, to ensure reliability and correctness.

## Usage

Here's how you can use the StreamPay Plugin in your Medusa Commerce project:

1. Initialize the plugin with your Medusa instance and configuration.

2. Implement payment authorization, capture, cancellation, and other payment-related logic using the provided methods and components.

3. Use the plugin to track payment statuses and handle transaction confirmations.

4. Customize the plugin behavior by modifying the configuration options.

5. Thoroughly test the integration to ensure reliable payment processing.

## Configuration

Customize the plugin behavior by adjusting the configuration options in your Medusa project. Configuration options may include:

- Solana RPC endpoint
- Wallet keys
- Confirmation thresholds
- Merchant transaction fees
- Payment methods

## Contributing

If you'd like to contribute to this project, please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Acknowledgments

- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- [Medusa Commerce](https://medusa-commerce.com/)
- [StreamPayments™](https://streampayments.org/)

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

