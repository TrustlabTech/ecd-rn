# Consent ECD
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
## RN Issues affecting the project

### Major
* Orientation change cannot be detected between renders. [This package](https://github.com/yamill/react-native-orientation) solves the problem but has been abandoned and does not work with RN 0.35 only up to 0.29
* secureTextEntry is broken for *phonePadText* and *emailAddressText* [Github Issue](https://github.com/facebook/react-native/issues/10678)

## Minor
* response.json() hangs when chrome debugging [Github Issue](https://github.com/facebook/react-native/issues/6679)
* [ActivityIndicator][Android] Indicator stays hidden if initialized as animating={false} [Github Issue](https://github.com/facebook/react-native/issues/9023)
* Status bar cannot change before activity is active, RN does not handle the promise rejection [Github Issue](https://github.com/facebook/react-native/issues/6700)
