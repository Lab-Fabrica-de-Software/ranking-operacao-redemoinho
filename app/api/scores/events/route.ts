export const runtime = "nodejs"; 

interface SSEClient {
  controller: ReadableStreamDefaultController;
  close: () => void;
}

let clients: SSEClient[] = [];

export function notifyScoreUpdate() {
  if (clients.length === 0) return;

  const encoder = new TextEncoder();
  const message = encoder.encode("event: update\ndata: ranking_changed\n\n");

  clients.forEach((client) => {
    try {
      client.controller.enqueue(message);
    } catch (err) {
      console.error("[SSE] Failed to notify a client:", err);
    }
  });

  console.log(`[SSE] Notified ${clients.length} client${clients.length > 1 ? "s" : ""}`);
}

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const client: SSEClient = {
        controller,
        close: () => {
          clients = clients.filter((c) => c !== client);
          console.log(`[SSE] Client disconnected (${clients.length} remaining)`);
        },
      };

      clients.push(client);
      console.log(`[SSE] Client connected (${clients.length} total)`);

      controller.enqueue(encoder.encode("event: connected\ndata: ok\n\n"));
    },

    cancel() {
      clients.forEach((c) => c.close());
      clients = [];
      console.log("[SSE] All clients disconnected");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
