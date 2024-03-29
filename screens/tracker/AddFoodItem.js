import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SearchBar, Text, useTheme } from '@rneui/themed';
// eslint-disable-next-line import/no-unresolved
import { REACT_APP_API_KEY } from '@env';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AddButton from '../../components/Buttons/AddButton';
import useTrackerStore from '../../state/TrackerStore';
import FoodScanner from '../foodScanner/FoodScanner';

import LArrowButton from '../../components/Buttons/LArrowButton';
import Status403 from './statusScreens/Status403';
import useAuthStore from '../../state/AuthStore';

function Item({ name, calories, onPress, nutrients, fdcId, navigation, dayIndex, mealName }) {
  const { theme } = useTheme();
  const values = {};
  const nutrientIdsArray = [
    { id: 1003, name: 'protein' },
    { id: 1005, name: 'carbs' },
    { id: 1004, name: 'fat' },
    { id: 1008, name: 'calories' },
    { id: 1087, name: 'calcium' },
    { id: 1098, name: 'copper' },
    { id: 1180, name: 'choline' },
    { id: 1100, name: 'iodine' },
    { id: 1090, name: 'magnesium' },
    { id: 1091, name: 'phosphorous' },
    { id: 1092, name: 'potassium' },
    { id: 1103, name: 'selenium' },
    { id: 1093, name: 'sodium' },
    { id: 1095, name: 'zinc' },
  ];

  function nutrientFilter(nutrientsArray, nutrientId, nutrientName) {
    const results = nutrientsArray.filter((obj) => obj.nutrientId === nutrientId);
    if (results.length > 0) {
      const property = nutrientName;
      Object.assign(values, { [property]: { value: results[0].value, unit: results[0].unitName } });
    }
  }

  const setValues = () => {
    Object.assign(values, { foodName: name, fdcId, foodId: uuidv4() });
    nutrientIdsArray.map((nutrient) => nutrientFilter(nutrients, nutrient.id, nutrient.name));
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: '1%',
        marginVertical: '1%',
        marginHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '90%' }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FoodDetails', {
              fdcId,
              dayIndex,
              mealName,
            })
          }
        >
          <Text>{name}</Text>
          <Text>{calories} cal</Text>
        </TouchableOpacity>
      </View>
      <AddButton
        onPress={() => {
          setValues();
          onPress(values);
        }}
      />
    </View>
  );
}

export default function AddFoodItem({ route, navigation }) {
  const state = useTrackerStore();
  const { id } = useAuthStore();
  const { theme } = useTheme();
  const { dayIndex, mealName } = route.params;
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [usedBarcode, setUsedBarcode] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (search) {
      setLoading(true);
      const searchData = setTimeout(() => {
        axios
          .get(
            `https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&dataType=Foundation,Survey%20%28FNDDS%29,SR%20Legacy&pageSize=50&sortBy=dataType.keyword&sortOrder=asc&api_key=${REACT_APP_API_KEY}`
          )
          .then((res) => {
            setData(res.data.foods);
            setLoading(false);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            if (err.response.status === 403) {
              setError(<Status403 />);
              setLoading(false);
              return error;
            }
            setLoading(false);
          });
      }, 2000);
      return () => clearTimeout(searchData);
    }
  }, [search]);

  const scanData = (value) => {
    axios
      .get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${value}&pageSize=10&api_key=${REACT_APP_API_KEY}`
      )
      .then((res) => {
        setUsedBarcode(true);
        setData(res.data.foods);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const updateSearch = (searchValue) => {
    setSearch(searchValue);
  };

  const addNewFood = (foodValues) => {
    state.addFood(id, foodValues, dayIndex, mealName);
    navigation.navigate('TrackerHome');
  };

  // eslint-disable-next-line consistent-return
  const renderItem = ({ item }) => {
    // when no input, show nothing
    if (search === '' && usedBarcode === false) {
      return null;
    }
    // filter of the name
    if (
      usedBarcode === false &&
      item.description.toUpperCase().includes(search.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      const nutrients = [];
      let calories = 0;
      item.foodNutrients.map((nutrient) => {
        nutrients.push({
          nutrientId: nutrient.nutrientId,
          name: nutrient.nutrientName,
          value: nutrient.value,
          unitName: nutrient.unitName,
        });
        if (nutrient.nutrientId === 1008) {
          calories = nutrient.value;
        }
        return calories;
      });

      return (
        <Item
          name={item.description}
          calories={calories}
          onPress={addNewFood}
          nutrients={nutrients}
          fdcId={item.fdcId}
          navigation={navigation}
          dayIndex={dayIndex}
          mealName={mealName}
        />
      );
    }
    if (usedBarcode === true) {
      const nutrients = [];
      let calories = 0;
      item.foodNutrients.map((nutrient) => {
        nutrients.push({
          nutrientId: nutrient.nutrientId,
          name: nutrient.nutrientName,
          value: nutrient.value,
          unitName: nutrient.unitName,
        });
        if (nutrient.nutrientId === 1008) {
          calories = nutrient.value;
        }
        return calories;
      });

      return (
        <Item
          name={item.description}
          fdcId={item.fdcId}
          calories={calories}
          onPress={addNewFood}
          nutrients={nutrients}
        />
      );
    }
  };

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          inputContainerStyle={{ backgroundColor: 'white', width: '100%' }}
          containerStyle={{
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            width: '100%',
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: '2%',
              alignItems: 'center',
              margin: '2%',
              width: 125,
            }}
            onPress={() => setModalOpen(true)}
          >
            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
            <Text style={{ color: 'black' }}>Scan Barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: '2%',
              alignItems: 'center',
              margin: '2%',
              width: 125,
            }}
            onPress={() => navigation.navigate('AddFoodManually', { mealName, dayIndex })}
          >
            <MaterialIcons name="post-add" size={24} color="black" />
            <Text style={{ color: 'black' }}>Manual Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ justifyContent: 'center', flex: 3.5 }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.white}
            visible={loading}
            textContent="Searching USDA Database..."
          />
        ) : (
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.fdcId} />
        )}
        {error || null}
      </View>
      <FoodScanner scanData={scanData} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <LArrowButton onPress={() => navigation.goBack()} />
    </View>
  );
}
