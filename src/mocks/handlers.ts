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

export const handlers = [getPorts()];
