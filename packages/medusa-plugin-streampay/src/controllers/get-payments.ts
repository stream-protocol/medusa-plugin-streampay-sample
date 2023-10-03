import { OrderService } from "@medusajs/medusa"
import StreamPay from "streamPay"
import StreamPayBase from "../core/streampay-base"
import { WidgetPayment } from "../types"

export async function getStreamPayPayments(req): Promise<WidgetPayment[]> {
  const { order_id } = req.params

  const orderService: OrderService = req.scope.resolve("orderService")
  const streamPayBase: StreamPayBase = req.scope.resolve("streamPayProviderService")

  const order = await orderService.retrieve(order_id, {
    relations: ["payments", "swaps", "swaps.payment", "region"],
  })

  const paymentIds = order.payments
    .filter((p) => p.provider_id === "streamPay")
    .map((p) => ({ id: p.data.id as string, type: "order" }))

  if (order.swaps.length) {
    const swapPayments = order.swaps
      .filter((p) => p.payment.provider_id === "streamPay")
      .map((p) => ({ id: p.payment.data.id as string, type: "swap" }))

    paymentIds.push(...swapPayments)
  }

  const payments = await Promise.all(
    paymentIds.map(async (payment) => {
      const intent = await streamPayBase
        .getStreamPay()
        .paymentIntents.retrieve(payment.id, {
          expand: ["latest_charge"],
        })

      const charge = intent.latest_charge as StreamPay.Charge

      return {
        id: intent.id,
        amount: intent.amount,
        created: intent.created,
        risk_score: charge?.outcome?.risk_score ?? null,
        risk_level: charge?.outcome?.risk_level ?? null,
        type: payment.type as "order" | "swap",
        region: order.region,
      }
    })
  )

  return payments
}