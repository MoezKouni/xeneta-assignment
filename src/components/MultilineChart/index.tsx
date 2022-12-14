import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { nest } from "d3-collection";
import Card from "../Card";
import When from "../shared/When";
import Overlay from "../Overlay";

interface DataChartItem {
  name: string;
  day: any;
  value: number;
}

interface Props {
  isLoading: boolean;
  isError: boolean;
  data: Array<DataChartItem>;
  selectedLine: Array<string>;
}

export default function MultilineChart({
  isLoading,
  isError,
  data,
  selectedLine,
}: Props) {
  // to detect the new line to animate, we should store the previous one
  const [prevItems, setPrevItems] = useState<Array<string>>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  // svg dimensions
  const dimensions = {
    width: 1000,
    height: 350,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 60,
    },
  };
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  // default color of each line
  const color = useCallback((lineName: string) => {
    switch (lineName) {
      case "low":
        return "#79ffe1";
      case "mean":
        return "#0bade5";
      case "high":
        return "#d5befd";
      default:
        return "#f1b928";
    }
  }, []);

  useEffect(() => {
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeFormat("%b %d"); // format the time for the path

    data.forEach(function (d: DataChartItem) {
      d.day = parseTime(new Date(d.day));
    });

    //scale xAxis
    let xScale = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d: any) {
          return new Date(d.day);
        }) as any
      ) // domain will be the "day" from first to last item in our data
      .range([0, width]); // the width of the X axis, visually, from 0 to the width of the svg (declared above)

    //scale yAxis
    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.value) + 200]) // domain will be from 0 to highest value + 200 for extra space in the end
      .range([height, 0]); // the height of the Y axis, visually, from height (declared above) to 0 of the svg

    // xAxis ticks
    let xAxis = d3
      .axisBottom(xScale)
      .tickFormat((el: any) => {
        return parseTime(el);
      })
      .tickValues(
        d3.map(data, function (d: any) {
          return new Date(d.day);
        }) as any
      );

    // draw xAxis
    const xAxisGroup = svg
      .append("g")
      .classed("x axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll(".tick text")
      .style("transform", "rotate(-20deg)")
      .style("color", "grey");

    xAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "grey")
      .attr("font-size", "0.6rem");

    // yAxis ticks
    const yAxis = d3.axisLeft(yScale).tickFormat((val) => `${val} $`);

    svg.append("g").classed("y axis", true).call(yAxis);

    // group our data by name attribute so we can draw multiple lines according to the name value
    const sumstat = nest()
      .key((d: any) => d.name)
      .entries(data);

    // draw lines
    const lines = svg
      .selectAll(".line")
      .append("g")
      .attr("class", "line")
      .data(sumstat)
      .enter()
      .append("path")
      .attr("d", function (d: any) {
        return d3
          .line()
          .x((d: any) => xScale(new Date(d.day)))
          .y((d: any) => yScale(d.value))(d.values);
      })
      .attr("role", "path")
      .attr("fill", "none")
      .attr("stroke", (d: any) => color(d.key))
      .attr("stroke-width", 3);

    lines.each((d: any, i: any, nodes: any) => {
      const element = nodes[i];
      const length = element?.getTotalLength || 1000;
      if (!prevItems.includes(d.key)) {
        d3.select(element)
          .attr("stroke-dasharray", `${length},${length}`)
          .attr("stroke-dashoffset", length)
          .transition()
          .duration(1000)
          .ease(d3.easeCubicIn)
          .attr("stroke-dashoffset", 0);
      }
    });
    setPrevItems(selectedLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Card>
      <When condition={isError || !data.length || isLoading}>
        <Overlay
          isError={isError}
          isInitial={data.length === 0}
          isLoading={isLoading}
          noLineSelected={selectedLine.length === 0}
        />
      </When>
      <svg ref={svgRef} width={svgWidth} height={svgHeight} />
    </Card>
  );
}
