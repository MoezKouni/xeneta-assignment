import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import Select from "../components/shared/Select";
import server from "../mocks/server";

const options = [
  {
    value: "NOOSL",
    label: "Oslo",
  },
  {
    value: "CNSGH",
    label: "Shanghai",
  },
  {
    value: "CNSTG",
    label: "Shantou",
  },
  {
    value: "NLRTM",
    label: "Rotterdam",
  },
  {
    value: "DEHAM",
    label: "Hamburg",
  },
  {
    value: "GBFXT",
    label: "Felixstowe",
  },
  {
    value: "USNYC",
    label: "New York",
  },
];

describe("Ports test suite", () => {
  test("Renders the component with loading state", async () => {
    render(
      <Select
        name="origin"
        onChange={(x: any) => console.log(x)}
        value=""
        placeholder="Choose an origin"
        options={[{ label: "", value: "" }]}
        loading={true}
      />
    );
    await screen.findByText(/Loading.../i);
  });

  test("should correctly set options", () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}/ports`, (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    render(
      <Select
        name="origin"
        onChange={(x: any) => console.log(x)}
        value=""
        placeholder="Choose an origin"
        options={options}
        loading={false}
      />
    );
    expect(
      (
        screen.getByRole("option", {
          name: "Choose an origin",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });

  test("Renders the select with options", async () => {
    render(
      <Select
        name="origin"
        onChange={(x: any) => console.log(x)}
        value=""
        placeholder="Choose an origin"
        options={options}
        loading={false}
      />
    );
    const option = await screen.findAllByRole("option");
    expect(option).toHaveLength(8);
  });
});
