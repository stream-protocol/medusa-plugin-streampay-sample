import { OrderDetailsWidgetProps, WidgetConfig } from "@medusajs/admin"
import { useAdminCustomQuery } from "medusa-react"
import { ListStreamPayIntentRes } from "../../types"
import { Container } from "../shared/components/container"
import Table from "../shared/components/table"
import StreamPayLogo from "../shared/icons/streampay-logo"

const MyWidget = (props: OrderDetailsWidgetProps) => {
  const { order } = props
  const { data } = useAdminCustomQuery<{}, ListStreamPayIntentRes>(
    `/orders/stream-payments/${order.id}`,
    ["admin_streampay"]
  )

  if (!order.payments.some((p) => p.provider_id === "streampay")) {
    return null
  }

  return (
    <Container title="StreamPayments™" icon={<StreamPayLogo />}>
      <div className="flex flex-col">
        {data && data?.payments?.length ? (
          <Table payments={data.payments} />
        ) : null}
      </div>
    </Container>
  )
}

export const config: WidgetConfig = {
  zone: "order.details.after",
}

export default MyWidget