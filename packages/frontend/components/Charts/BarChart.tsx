import { BoxProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { barChartData, barChartOptions } from "../../variables/charts";
import Card from "../Card/Card";
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props extends BoxProps {

}

const BarChart = (props: Props) => {

  return (
    <Card
      {...props}
      py="1rem"
      height={{ sm: "200px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <ReactApexChart
        options={barChartOptions}
        series={barChartData}
        type="bar"
        width="100%"
        height="100%"
      />
    </Card>
  );
}
export default BarChart;
