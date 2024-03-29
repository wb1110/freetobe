import { Button, useTheme } from '@rneui/themed';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import useAuthStore from '../../state/AuthStore';
import useMetabolicStore from '../../state/MetabolicStore';
import Calendar from './Calendar';
import Bowel from './categories/Bowel';
import Fertility from './categories/Fertility';
import Hair from './categories/Hair';
import Mood from './categories/Mood';
import Nails from './categories/Nails';
import Period from './categories/Period';
import PhysicalActivity from './categories/PhysicalActivity';
import Pulse from './categories/Pulse';
import Sex from './categories/Sex';
import Skin from './categories/Skin';
import Temperature from './categories/Temperature';
import createNewData from './functions';
import PinnedComponent from './PinnedComponent';

function MetabolicJournal({ navigation }) {
  // there is no connection to the tracker or home tab at this time, but eventually the app will need to look for a correlation between the foods consumed on that day and what was recorded in the journal to provide helpful hints to the user
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // date = datePickerDate
  const [date, setDate] = useState(new Date());
  const [dateData, setDateData] = useState(moment(new Date()).format('L'));
  const metabolicState = useMetabolicStore();
  const { addJournalEntry, metabolicJournal } = metabolicState;
  const { id } = useAuthStore();
  const [metabolicData, setMetabolicData] = useState({});
  const { theme } = useTheme();

  const journalEntryExists = () => metabolicJournal.find((entry) => entry.date === dateData);

  useEffect(() => {
    const existingEntry = journalEntryExists();
    if (!existingEntry) {
      setMetabolicData(createNewData(dateData));
    } else {
      setMetabolicData(existingEntry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateData]);

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: theme.colors.secondary }}
    >
      <View>
        <Calendar
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
          setDateData={setDateData}
          date={date}
          setDate={setDate}
        />
      </View>
      {/* The below section is a flatlist of the array of Metabolic Journal components
            Users need to be able to reorder components in the array by pressing and dragging them to a new position
            Users need to be able to be able to add/replace a component in the pinned section
      */}
      <ScrollView directionalLockEnabled style={{ width: '100%' }}>
        <PinnedComponent
          metabolicData={metabolicData}
          setMetabolicData={setMetabolicData}
          navigation={navigation}
        />
        <Temperature metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Pulse metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Mood metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Sex metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Bowel metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Period
          metabolicData={metabolicData}
          setMetabolicData={setMetabolicData}
          navigation={navigation}
          metabolicJournal={metabolicJournal}
        />
        <Fertility metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <PhysicalActivity metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Skin metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Hair metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
        <Nails metabolicData={metabolicData} setMetabolicData={setMetabolicData} />
      </ScrollView>
      <View style={{ width: '90%', margin: '2%' }}>
        <Button
          title="Log the Journal"
          onPress={() => {
            addJournalEntry(id, metabolicData);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default MetabolicJournal;
