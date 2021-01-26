

v4.2.0
======
- an updated version of Facebook SDK for Android, which should enable publishing apps with this module again
- fixes issues with `react-native link` on Android

v4.1.1
======
- Add Slack integration

v4.1.0
======
- Adds a new API `addTestDevice` that, when used, fixes all the `no fill` errors that users reported!
- Change `currentDeviceHashId` to `currentDeviceHash`

v4.0.0
======
- Support for React Native 0.40

v3.1.1
======
This release updates dependencies to latest React Native and fixes a common issue on Android where native ad was not clickable.

We have rolled out a hot-fix that triggers click on a native side, but we will investigate whether better (more idiomatic) solution can be applied.

v3.1.0
======
On our way to implementing entire Facebook Audience SDK, this release adds AdSettings module.

Amongst all its features, it allows you to debug your Facebook network ads on a real device. Just call `AdSettings.addTestDevice` and reload your app.

Check its documentation for [more](https://github.com/callstack/react-native-fbads#adsettings)

v3.0.0
======
Initial Facebook Audience SDK release.

