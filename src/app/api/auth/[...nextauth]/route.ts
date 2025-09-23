// Temporarily disabled auth route for build
export async function GET() {
  return new Response(JSON.stringify({ error: 'Auth disabled' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST() {
  return new Response(JSON.stringify({ error: 'Auth disabled' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}