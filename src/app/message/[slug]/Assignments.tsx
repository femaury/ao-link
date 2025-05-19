import React, { memo } from "react"

import { EntityMessagesTable } from "@/app/entity/[slug]/EntityMessagesTable"
import { getAssignments } from "@/services/messages-api"
import { AoMessage } from "@/types"

type Props = {
  message: AoMessage
  onCountReady?: (count: number) => void
  onDataReady?: (data: AoMessage[]) => void
}

function BaseAssignments(props: Props) {
  const { message, onCountReady, onDataReady } = props

  const pageSize = 100

  return (
    <EntityMessagesTable
      pageSize={pageSize}
      fetchFunction={async (offset, ascending, sortField, lastRecord) => {
        let [count, records] = await getAssignments(
          pageSize,
          lastRecord?.cursor,
          ascending,
          message.id,
          message.action,
        )

        if (count !== undefined && onCountReady) {
          onCountReady(count)
        }

        if (onDataReady) {
          // onDataReady(records)
          onDataReady([])
        }

        return records
      }}
    />
  )
}

// TODO FIXME
export const Assignments = memo(BaseAssignments)
