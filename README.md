# Consent ECD

![Image](https://cloud.githubusercontent.com/assets/4153188/19593829/b43806ce-9782-11e6-82f8-a15a3c7ba8ed.png)

### Run
`emulator -avd Nexus_S_API_22`
`react-native run-android`


## RN Issues affecting the project

* secureTextEntry is broken for *phonePadText* and *emailAddressText* [Github Issue](https://github.com/facebook/react-native/issues/10678)
* Orientation change cannot be detected between renders. [This package](https://github.com/yamill/react-native-orientation) solves the problem but has been abandoned and does not work with RN 0.35 only up to 0.29
* Status bar cannot change before activity is active, RN does not handle the promise rejection [Github Issue](https://github.com/facebook/react-native/issues/6700)
* response.json() hangs when chrome debugging [Github Issue](https://github.com/facebook/react-native/issues/6679)
* Debugger and device lose sync [GithubIssue](https://github.com/facebook/react-native/issues/8720)
* [ActivityIndicator][Android] Indicator stays hidden if initialized as animating={false} [GithubIssue](https://github.com/facebook/react-native/issues/9023)