import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme, Text } from '@rneui/themed';
import axios from 'axios';

export default function CMS() {
  const { theme } = useTheme();
  const [title, setTitle] = useState('Daily Tip Title');
  const [body, setBody] = useState('Daily Tip Body');

  useEffect(() => {
    const token =
      '683530d69505bd12e579e09d6d65913c18338f0ae175f51cb0b838a289e831272df81617142e7633a707463983b123b6efa389d44d4fd3d5e4a5249e612d623770b00d056417805a853a3e72cd882bdb69a39baed9d2e6538a8950c8a0d045a5edb15e99b036679056c9b978c485f2936d011401ddf96c9fb3c713b8c91f38ce';
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    axios
      .get('http://localhost:1337/api/tips?sort[0]=updatedAt%3Adesc', config)
      .then((response) => {
        // handle success
        const entry = response.data.data[0].attributes;
        setTitle(entry.Title);
        setBody(entry.Body);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
      });
  }, []);
  return (
    <View
      style={{
        margin: 12,
        flex: 1,
      }}
    >
      <Text h4 h4Style={{ marginBottom: 12, fontSize: 24, color: theme.colors.white }}>
        {title}
      </Text>
      <View>
        <Text style={{ marginBottom: 12, color: theme.colors.white }}>{body}</Text>
      </View>
    </View>
  );
}
