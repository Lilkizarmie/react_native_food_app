import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants';
import {StaticImageService} from '../services';
import {useDispatch} from 'react-redux';
import {BookmarkAction} from '../actions';
import { useFonts } from 'expo-font';

const BookmarkCard = ({id, name, images, location, tags, navigate}) => {
  const dispatch = useDispatch();

  const removeBookmark = () =>
    dispatch(BookmarkAction.removeBookmark({restaurantId: id}));

  const [fontsLoaded] = useFonts({
    'Poppins Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins Extra Bold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins Extra Light': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins Semi Bold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Ionicons
        name="close-circle"
        color={Colors.DEFAULT_GREY}
        size={22}
        style={styles.remomveIcon}
        onPress={() => removeBookmark()}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(id)}>
        <Image
          source={{uri: StaticImageService.getPoster(images?.poster)}}
          style={styles.posterStyle}
        />
      </TouchableOpacity>
      <View style={styles.labelContainer}>
        <Text style={styles.titleText}>{name}</Text>
        <View style={styles.rowAndCenter}>
          <Entypo name="location" size={10} color={Colors.DEFAULT_GREY} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <Text style={styles.tagText}>{tags?.slice(0, 3).join(' • ')}</Text>
        <View style={styles.buttonLabelRow}>
          <View style={styles.rowAndCenter}>
            <FontAwesome name="star" size={13} />
            <Text style={styles.ratingText}>4.3</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="ios-time-outline"
              color={Colors.GOOGLE_BLUE}
              size={15}
            />
            <Text style={styles.ratingText}>20 mins</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="location-outline"
              color={Colors.SECONDARY_GREEN}
              size={15}
            />
            <Text style={styles.ratingText}>10 KM</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  posterStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  remomveIcon: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    right: 0,
  },
  labelContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: 'Poppins Medium',
    color: Colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: 'Poppins Medium',
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: 'Poppins Medium',
    color: Colors.DEFAULT_GREY,
    marginBottom: 5,
    marginLeft: 5,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: 'Poppins Semi Bold',
    color: Colors.DEFAULT_BLACK,
    marginLeft: 3,
  },
  buttonLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BookmarkCard;
