import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Chart,
  Line,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
  ChartDataPoint,
} from 'react-native-responsive-linechart';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../constants/Colors';
import * as Global from '../../Global';

type Point = {
  x: number;
  y: number;
};

type PriceChartProps = {
  data: Array<Point>;
  cardStyle: object;
} & React.ReactPropTypes;

const PriceChart: React.FC<PriceChartProps> = ({
  data,
  cardStyle,
}): JSX.Element => {
  const defaultColor =
    data[data.length - 1].y < data[0].y ? Colors.red : Colors.greenMain;
  const activeColor =
    data[data.length - 1].y < data[0].y ? Colors.greenMain : Colors.red;

  return (
    <LinearGradient
      style={{
        ...styles.card,
        ...cardStyle,
      }}
      colors={Colors.cardInfoGradient}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        Price Chart 7d
      </Text>
      <Chart
        style={styles.chart}
        padding={{left: 30, bottom: 20, right: 50, top: 30}}
        data={data}>
        <VerticalAxis
          tickCount={7}
          theme={{
            labels: {visible: false},
            axis: {stroke: {color: Colors.grayMain, width: 2}},
            grid: {stroke: {color: Colors.grayMain, width: 2}},
            ticks: {visible: false},
          }}
        />
        <HorizontalAxis
          tickCount={7}
          theme={{
            labels: {visible: false},
            axis: {visible: true, stroke: {color: Colors.grayMain, width: 2}},
            grid: {visible: true, stroke: {color: Colors.grayMain, width: 2}},
            ticks: {visible: false},
          }}
        />
        <Line
          theme={{
            stroke: {color: defaultColor, width: 4},
          }}
          smoothing="cubic-spline"
          tooltipComponent={
            <Tooltip
              theme={{
                shape: {
                  width: 50,
                  height: 25,
                  color: Colors.grayBackground,
                },
                formatter: (v: ChartDataPoint) => `${v.y.toFixed(0)}$`,
              }}
            />
          }
        />
      </Chart>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  chart: {
    width: '100%',
    height: '80%',
  },
  card: {
    flex: 1,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    //height: 204,
    height: '20%',
    marginRight: 40,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
  },

  tooltip: {
    width: '5vh',
  },
  cardTitle: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    margin: 20,
    marginLeft: 30,
    marginBottom: 10,
  },
});

export default PriceChart;
