"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { STRIPE_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/stripe-trigger";
import { BaseTriggerNode } from "../base-trigger-node";
import { fetchStripeTriggerRealtimeToken } from "./actions";
import { StripeDialog } from "./dialog";

export const StripeTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: STRIPE_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchStripeTriggerRealtimeToken,
  });
  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <BaseTriggerNode
        {...props}
        id={props.id}
        icon="/logos/stripe.svg"
        name="Stripe"
        description="When Stripe event is captured"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
      <StripeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
});

StripeTriggerNode.displayName = "StripeTriggerNode";
