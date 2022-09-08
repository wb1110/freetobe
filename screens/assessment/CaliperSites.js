import { ButtonGroup, Input } from "@rneui/themed";
import { SafeAreaView, View } from 'react-native';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import LArrowButton from '../../components/Buttons/LArrowButton';
import RoundButton from '../../components/Buttons/RoundButton';
import StandardButton from '../../components/Buttons/StandardButton';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import { useState } from "react";


function CaliperSites({ navigation }) {
  const [selected, setSelected] = useState(3);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <Container>
        <CustomText>
          How many sites did you use?
        </CustomText>
        <View style={{ flexDirection: 'row' }}>
          {selected === 3 ? <RoundButton title="3" type="clear" onPress={() => setSelected(3)}/> : <RoundButton title="3" onPress={() => setSelected(3)}/>}
          {selected === 4 ? <RoundButton title="4" type="clear" onPress={() => setSelected(4)}/> : <RoundButton title="4" onPress={() => setSelected(4)}/>}
          {selected === 7 ? <RoundButton title="7" type="clear" onPress={() => setSelected(7)}/> : <RoundButton title="7" onPress={() => setSelected(7)}/>}
          {selected === 9 ? <RoundButton title="9" type="clear" onPress={() => setSelected(9)}/> : <RoundButton title="9" onPress={() => setSelected(9)}/>}
        </View>
        <CustomText>
          Type in your measurements in mm
        </CustomText>
        <Input label='Abdominal' />
        <Input label='Triceps' />
        <Input label='Suprailiac' />
        <StandardButton title="Submit" onPress={() => {navigation.navigate('Home')}}/>
        <LArrowButton onPress={() => {navigation.navigate('BodyFatPercentage')}}/>
      </Container>
    </SafeAreaView>
  );
}

export default CaliperSites;