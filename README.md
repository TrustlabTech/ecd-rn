# Consent ECD
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
![screen shot 2017-01-18 at 10 56 50 am](https://cloud.githubusercontent.com/assets/4153188/22057322/ee5f22c6-dd6c-11e6-9c53-4f5659f2f25c.png)
## RN Issues affecting the project

### Major
* Orientation change cannot be detected between renders. [This package](https://github.com/yamill/react-native-orientation) solves the problem but has been abandoned and does not work with RN 0.35 only up to 0.29
* secureTextEntry is broken for *phonePadText* and *emailAddressText* [Github Issue](https://github.com/facebook/react-native/issues/10678)

## Minor
* response.json() hangs when chrome debugging [Github Issue](https://github.com/facebook/react-native/issues/6679)
* [ActivityIndicator][Android] Indicator stays hidden if initialized as animating={false} [Github Issue](https://github.com/facebook/react-native/issues/9023)
* Status bar cannot change before activity is active, RN does not handle the promise rejection [Github Issue](https://github.com/facebook/react-native/issues/6700)
