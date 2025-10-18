import prisma from "@/lib/database";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", retries: 3 },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Fetching the video from YouTube
    await step.sleep("fetching-video", "5s");

    // Processing the video
    await step.sleep("processing-video", "5s");

    // Sending the video to Inngest
    await step.sleep("sending-video", "5s");

    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "workflow-from-inngest",
        },
      });
    });
  },
);
