import { SafeAreaView, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import LArrowButton from '../../components/Buttons/LArrowButton';
import RArrowButton from '../../components/Buttons/RArrowButton';
import Container from '../../components/Container';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import TextContainer from "../../components/TextContainer";


function LieSkinny4({ navigation }) {
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <FocusedStatusBar />
        <Container>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TextContainer>
            Women eat anywhere from 1 to 7 meals a day. While you are tracking these three days, fill in the times and the amounts of meals you ate that day. Only fill in the meals you eat, there is no need to fill in all 7 meals. Currently, we are just getting a baseline of where to start you in your nutrition journey. At the top of the page you will see three macronutrients and your calories you consumed for the day. For the purpose of these 3 days, it will only count up from 0 to show you what you ate for the day. After the 3 days, it will show your goals for each macronutrients and fill in the circle underneath according to how many more grams you need to consume to meet your goals.
            </TextContainer>
          </ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <LArrowButton onPress={() => navigation.goBack()}/>
            <RArrowButton title="Let's Get Started" onPress={() => alert('UserHome Route')} />
          </View>
        </Container>
      </SafeAreaView>
  );
}

export default LieSkinny4;