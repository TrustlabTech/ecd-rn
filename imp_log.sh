adb logcat | sed '/ReactNative/!d ;s/^.\{48\}//'
