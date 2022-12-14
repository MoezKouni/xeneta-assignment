import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import MultilineChart from "../components/MultilineChart";
import Overlay from "../components/Overlay";
import Loading from "../components/shared/Message/Loading";
import server from "../mocks/server";

describe("Rates test suite", () => {
  test("Renders the loading overlay in a loading state", async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}/rates`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(<Loading />);
    const loading = await screen.findByText("Loading...");
    expect(loading).toBeVisible();
  });

  test("Should render error message on 404", async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}/rates`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(
      <Overlay
        isError={true}
        isInitial={false}
        isLoading={false}
        noLineSelected={false}
      />
    );
    const error = await screen.findByText("Oops, something went wrong!");
    expect(error).toBeVisible();
  });

  test("Renders path line", async () => {
    render(
      <MultilineChart
        data={[{ day: "2020-01-01", value: 120, name: "high" }]}
        isLoading={false}
        isError={false}
        selectedLine={["high"]}
      />
    );
    const option = await screen.findByRole("path");
    expect(option).toBeVisible();
  });
});
