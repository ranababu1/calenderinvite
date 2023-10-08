import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useDerivedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const slides = [
  { title: 'Welcome to Our App!' },
  { title: 'Generate Invites Easily' },
  { title: 'Share Everywhere' }
];

const OnboardingSlider = (onDone) => {
  const scrollX = useSharedValue(0);
  const maxScrollX = (slides.length - 1) * width;


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });

  

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {slides.map((slide, index) => (
        <View style={[styles.slide, { width }]} key={index}>
          <Text style={styles.title}>{slide.title}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  }
});

export default OnboardingSlider;