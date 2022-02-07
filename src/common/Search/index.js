import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';
import colors from '../../constants/colors.json';
export default function SearchInput() {
  return (
    <View style={styles.searchContainer}>
      <Item style={styles.searchItem} rounded>
        <Image
          style={styles.searchIcon}
          source={require('../../assets/icons/search.png')}
        />
        <Input
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor={'#000'}
        />
      </Item>
    </View>
  );
}

var styles = StyleSheet.create({
  searchItem: {backgroundColor: colors.white, height: 38},
  searchInput: {fontSize: 17, color: colors.black},
  searchIcon: {marginLeft: 18},
  searchContainer: {
    marginTop: 20,
    height: 38,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
