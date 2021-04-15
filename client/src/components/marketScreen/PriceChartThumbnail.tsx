import React from 'react';
import {StyleSheet} from 'react-native';
import {Chart, Line} from 'react-native-responsive-linechart';

import Colors from '../../constants/Colors';

type Point = {
  x: number;
  y: number;
};

type PriceChartProps = {
  data: Array<Point>;
} & React.ReactPropTypes;

const PriceChartThumbnail: React.FC<PriceChartProps> = ({
  data,
}): JSX.Element => {
  const defaultColor =
    data[data.length - 1].y < data[0].y ? Colors.red : Colors.greenMain;
  return (
    <Chart style={styles.chart} data={data}>
      <Line
        theme={{
          stroke: {color: defaultColor, width: 2, opacity: 1},
        }}
      />
    </Chart>
  );
};

const styles = StyleSheet.create({
  chart: {
    width: '100%',
    height: '100%',
  },
});

export default PriceChartThumbnail;
