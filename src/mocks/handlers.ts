import { rest } from "msw";

function getPorts() {
  return rest.get(`${process.env.REACT_APP_API_URL}/ports`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          code: "NOOSL",
          name: "Oslo",
        },
        {
          code: "CNSGH",
          name: "Shanghai",
        },
        {
          code: "CNSTG",
          name: "Shantou",
        },
        {
          code: "NLRTM",
          name: "Rotterdam",
        },
        {
          code: "DEHAM",
          name: "Hamburg",
        },
        {
          code: "GBFXT",
          name: "Felixstowe",
        },
        {
          code: "USNYC",
          name: "New York",
        },
      ])
    );
  });
}
function getRates() {
  return rest.get(`${process.env.REACT_APP_API_URL}/rates`, (req, res, ctx) => {
    const origin = req.url.searchParams.get("origin");
    const destination = req.url.searchParams.get("destination");

    // In case there is no origin or destination query parameter return the original response
    if (!origin || !destination) {
      return res(ctx.status(500));
    }

    return res(
      ctx.json([
        {
          day: "2021-01-01",
          mean: 1401,
          low: 738,
          high: 2361,
        },
        {
          day: "2021-01-02",
          mean: 1401,
          low: 738,
          high: 2361,
        },
      ])
    );
  });
}

export const handlers = [getPorts(), getRates()];
