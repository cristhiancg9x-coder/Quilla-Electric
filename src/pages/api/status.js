// src/pages/api/status.js
export const GET = async ({ params, request }) => {
  return new Response(JSON.stringify({
      message: "Backend operativo",
      timestamp: new Date().toISOString(),
      service: "QuillaElectric API"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}