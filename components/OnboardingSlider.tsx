import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const slides = [
  { title: 'Welcome to Our App!' },
  { title: 'Generate Invites Easily' },
  { title: 'Share Everywhere' },
];

const OnboardingSlider = ({ onDone }) => {
  const scrollX = useSharedValue(0);
  const maxScrollX = (slides.length - 1) * width;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const isLastSlide = useDerivedValue(() => {
    return scrollX.value >= maxScrollX;
  });

  const animatedFooterStyle = useAnimatedStyle(() => {
    return {
      opacity: isLastSlide.value ? 1 : 0,
    };
  });

  return (
    <View style={styles.container}>
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
      <Animated.View style={[styles.footer, animatedFooterStyle]}>
        <Text style={styles.footerText} onPress={onDone}>
          Start Using the App
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width is provided dynamically
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#2ecc71',
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OnboardingSlider;
