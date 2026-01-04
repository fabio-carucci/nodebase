import toposort from "toposort";
import type { Connection, Node } from "@/generated/prisma/client";

export const topologicalSort = (nodes: Node[], connections: Connection[]) => {
  // If no connections, return node as-it (they're all indipendent)
  if (connections.length === 0) return nodes;

  // Create endges array for toposort
  const edges: [string, string][] = connections.map((conn) => [
    conn.fromNodeId,
    conn.toNodeId,
  ]);

  // Add nodes with no connections as self-edges to ensure they're included
  const connectedNodesIds = new Set<string>();
  for (const conn of connections) {
    connectedNodesIds.add(conn.fromNodeId);
    connectedNodesIds.add(conn.toNodeId);
  }

  for (const node of nodes) {
    if (!connectedNodesIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  // Perform topological sort
  let sortedNodesIds: string[];
  try {
    sortedNodesIds = toposort(edges);

    // Remove duplicates from self-edges
    sortedNodesIds = [...new Set(sortedNodesIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error("Workflow contains a cycle");
    }
    throw error;
  }

  // Map sorted IDs back to node objects
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // biome-ignore lint/style/noNonNullAssertion: <We know that the node exists>
  return sortedNodesIds.map((id) => nodeMap.get(id)!).filter(Boolean);
};
