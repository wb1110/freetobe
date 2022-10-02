import { Text, useTheme } from '@rneui/themed';
import { SafeAreaView } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryContainer, VictoryLabel, VictoryPie } from 'victory-native';

export default function PFCPieChart({ TDEE }) {
  const { theme } = useTheme();

  let protein;
  let carb;
  let fat;

  const macroOptions = (option) => {
    if (option === 1) {
      protein = Math.round((TDEE * 0.3) / 4);
      carb = Math.round((TDEE * 0.4) / 4);
      fat = Math.round((TDEE * 0.3) / 4);
    }
    if (option === 2) {
      protein = Math.round((TDEE * 0.2) / 4);
      carb = Math.round((TDEE * 0.55) / 4);
      fat = Math.round((TDEE * 0.25) / 4);
    }
    if (option === 3) {
      protein = Math.round((TDEE * 0.25) / 4);
      carb = Math.round((TDEE * 0.45) / 4);
      fat = Math.round((TDEE * 0.2) / 4);
    }
  };

  macroOptions(1);

  return (
    <SafeAreaView>
      <Text h1 style={{ textAlign: 'center' }}>
        Maintenance
      </Text>
      <Svg viewBox="0 147 400 400">
        <VictoryPie
          width={300}
          style={{
            labels: {
              fill: theme.colors.white,
            },
          }}
          colorScale={['#519085', '#E9E0AC', '#88CED2']}
          containerComponent={
            <VictoryContainer width={425} style={{ marginLeft: '21%', top: '-20%' }} />
          }
          innerRadius={75}
          // animate={{ duration: 1000 }}
          data={[
            { x: `Protein ${protein}g`, y: protein },
            { x: `Carbohydrates ${carb}g`, y: carb },
            { x: `Fats ${fat}g`, y: fat },
          ]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20, fill: theme.colors.white }}
          x={200}
          y={200}
          text={`${TDEE} cal`}
        />
      </Svg>
    </SafeAreaView>
  );
}