import * as React from 'react';

import { StyleSheet, FlatList, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import ConsoleOsLog from 'react-native-console-oslog';

const {flag, code, name, countries} = require('country-emoji');

export default function App() {
  const [selected, _setSelected] = React.useState(new Map());  
  const [offset, _setOffset] = React.useState<number>(0);

  function setSelected(newSelected) {
    _setSelected(newSelected);

    console.log(`Selected: ${newSelected.size > 0 ? 'true' : 'false'}`);
    console.log(`Selection: ${Array.from(newSelected.keys())}`);
  }

  function setOffset(newOffset) {
    console.log(`Selected: ${newOffset > offset ? '↘️' : '↗️'}`);
    _setOffset(newOffset);
  }

  const data = Object.keys(countries)
    .map((code) => { 
      return {
        code: code, 
        name: name(code),
        flag: flag(code),
      }
    });

  React.useEffect(() => {
    ConsoleOsLog.captureConsole();
  }, []);

  const onSelect = React.useCallback(
    code => {
      const newSelected = new Map(selected);
      if (selected.get(code)) {
        newSelected.delete(code)
      } else {
        newSelected.set(code, true);
      }
      setSelected(newSelected);
    },
    [selected],
  );

  function Item({ code, name, flag, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(code)}
        style={[
          selected ? styles.selectedItem : styles.item
        ]}
      >
        <Text style={[
          styles.name
        ]}>{flag} {name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        onScroll={ event => {
          setOffset(Math.round(event.nativeEvent.contentOffset.y));
          console.log(`Offset: ${offset}`);
        }}
        scrollEventThrottle={20}
        renderItem={({ item }) => (
          <Item
            code={item.code}
            name={item.name}
            flag={item.flag}
            selected={!!selected.get(item.code)}
            onSelect={onSelect}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  item: {
    padding: 16,
    fontSize: 21,
    height: 64,
    backgroundColor: 'clear',
  },
  selectedItem: {
    padding: 16,
    fontSize: 21,
    height: 64,
    backgroundColor: 'orange',
  },
  name: {
    color: 'black',
    fontSize: 21,
  },
});
