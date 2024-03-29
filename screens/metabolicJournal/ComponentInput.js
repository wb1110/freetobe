import { Text } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

function ComponentButton({ buttonTitle, buttonIcon, metabolicData, setMetabolicData, category }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (metabolicData[category] !== undefined) {
      if (metabolicData[category].includes(buttonTitle)) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }
  }, [metabolicData]);

  const handleAddItem = (value) => {
    setSelected(!selected);
    if (metabolicData[category].includes(value)) {
      const removedItemArray = metabolicData[category].filter((item) => item !== value);
      setMetabolicData({
        ...metabolicData,
        [category]: removedItemArray,
      });
    } else {
      setMetabolicData({
        ...metabolicData,
        [category]: [...metabolicData[category], value],
      });
    }
  };
  const changeDisplay = () => {
    if (selected) {
      return 'flex';
    }
    return 'none';
  };

  return (
    <TouchableOpacity
      onPress={() => handleAddItem(buttonTitle)}
      style={{ alignItems: 'center', marginRight: 16, width: 80, height: 90 }}
    >
      <View>
        {buttonIcon}
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            backgroundColor: 'green',
            borderRadius: 20,
            display: changeDisplay(),
          }}
        >
          <FontAwesome5 name="check-circle" size={24} color="white" />
        </View>
      </View>
      <Text style={{ textAlign: 'center' }}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

export default ComponentButton;
