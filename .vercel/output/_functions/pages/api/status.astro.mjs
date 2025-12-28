export { renderers } from '../../renderers.mjs';

// src/pages/api/status.js
const GET = async ({ params, request }) => {
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
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
