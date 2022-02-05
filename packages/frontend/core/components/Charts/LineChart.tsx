import { Box, BoxProps } from "@chakra-ui/react";
import { lineChartData, lineChartOptions } from "../../variables/charts";
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props extends BoxProps {

}

const LineChart = (props: Props) => {
  return (
    <Box {...props}>
      <ReactApexChart
        options={lineChartOptions}
        series={lineChartData}
        type="area"
        width="100%"
        height="100%"
      />
    </Box>
  );
}
export default LineChart;


