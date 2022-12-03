import { Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryContainer, VictoryLabel, VictoryPie } from 'victory-native';

export default function MacroPie({ macro, goal, label, complete }) {
  const { theme } = useTheme();
  const remainingGoal = goal - macro;
  const data = [];
  const noData = [{ y: 1 }];
  if (complete) {
    data.push(
      // if (complete === true ) use remainingGoal
      { x: goal, y: goal },
      { x: macro, y: macro }
    );
  } else {
    data.push(
      // if (complete === false) only use macro numbers and add up
      { x: macro, y: macro }
    );
  }

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Text>{label}</Text>
      <Svg viewBox="0 150 420 400">
        <VictoryPie
          width={190}
          style={{
            labels: {
              fill: theme.colors.white,
            },
          }}
          colorScale={['#519085', '#E9E0AC', '#88CED2']}
          containerComponent={
            <VictoryContainer
              width={200}
              style={{ top: '-39%', alignItems: 'center', left: '6%', marginTop: '6%' }}
            />
          }
          innerRadius={30}
          labels={() => null}
          // animate={{ duration: 1000 }}
          data={macro ? data : noData}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 80, fill: theme.colors.white }}
          x={210}
          y={340}
          // if (complete === false) only use macro numbers
          text={complete ? remainingGoal : macro}
        />
      </Svg>
    </View>
  );
}
