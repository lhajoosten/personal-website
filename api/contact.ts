import { deliverContactPayload } from "../src/data/deliver-contact.ts";

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = await deliverContactPayload(payload);
  return Response.json(result.body, { status: result.status });
}
