import { SafeAreaView, Text } from 'react-native';
import { FocusedStatusBar } from '../../components';
import ArrowRight from '../../components/ArrowRight';
import Button from '../../components/Button';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';


function Gender({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <Container>
        <CustomText>Before we get started in order to make the best plan for you, we will need some more information.</CustomText>
        <CustomText>Gender</CustomText>
        <CustomText>Fill in the following to get started:</CustomText>
        <Button title="Female" />
        <Button title="Nonbinary" />
        <TouchableOpacity onPress={() => {navigation.navigate('HeightWeightAge')}}>
          <Ionicons name="arrow-forward-circle" size={48} color={COLORS.primary} />
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
}

export default Gender;
