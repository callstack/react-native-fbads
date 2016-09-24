react-native-fbads <img src="https://david-dm.org/callstack-io/react-native-fbads.svg" /> <img src="https://david-dm.org/callstack-io/react-native-fbads/dev-status.svg" />
============

> Native Facebook Ads integration for React Native

<img src="https://cloud.githubusercontent.com/assets/2464966/18811079/52c99932-829e-11e6-9a3d-218569d71a6d.png" height="500" />

## Table of Contents

- [Installation](#installation)
  - [Create React Native project](#1-create-react-native-project)
  - [Install Javascript packages](#2-install-javascript-packages)
  - [Configure native projects](#3-configure-native-projects)
    - [iOS](#31-ios)
    - [Android](#32-android)
- [Usage](#usage)
   - [withNativeAd](#1-withnativead)
   - [FBNativeAdManager](#2-fbnativeadmanager)
- [Running example](#running-example)
   - [Install dependencies](#1-install-dependencies)
   - [Start packager](#2-start-packager)
   - [Run it on iOS / Android](#3-run-it-on-ios--android)

## Installation

### 1. Create React Native project

First create a React Native project:

```bash
$ react-native init YourApp
```

### 2. Install Javascript packages

Install JavaScript packages:

```bash
$ react-native install react-native-fbads
```

### 3. Configure native projects

#### 3.1 iOS

The react-native-fbads has been automatically linked for you, the next step will be downloading and linking the native Facebook SDK for iOS. Make sure you have the latest Xcode installed. Open the .xcodeproj in Xcode found in the ios subfolder from your project's root directory. Now, follow all the steps in the [Getting Started Guide for Facebook SDK](https://developers.facebook.com/docs/ios/getting-started) for iOS. Along with FBSDKCoreKit.framework, don't forget to import FBAudienceNetwork.framework.

Next, **follow steps 1 and 3** from the [Getting Started Guide for Facebook Audience](https://developers.facebook.com/docs/audience-network/getting-started). Once you have created the `placement id`, put it into your
`Info.plist` under `FacebookAdsPlacementID` key as in [the example](https://github.com/callstack-io/react-native-fbads/blob/master/example/ios/example/Info.plist#L32-L33).

#### 3.2. Android

> Coming soon...

## Usage

For detailed usage please check `examples` folder.

### 1. withNativeAd

withNativeAd wrapper passes `nativeAd` to a wrapped component through props as
soon as it's been loaded.

```javascript
import { withNativeAd } from 'react-native-fbads';

class AdComponent extends React.Component {
  render() {
    return (
      <View>
        <Text>{nativeAd.description}</Text>
      </View>
    );
  }
}

export default withNativeAd(AdComponent);
```

For full details on the `nativeAd` object, please check flowtype definitions [here](https://github.com/callstack-io/react-native-fbads/blob/master/src/types.js)

### 2. FBNativeAdManager

> Public API allowing you to control cache policy and more coming soon. Contributions welcome.

## Running example

### 1. Install dependencies

```bash
$ npm install
```

### 2. Start packager

Because of the way example project is set up (custom packager arguments), you'll
have to start it explicitly before any other command

```bash
$ cd ./example && npm start
```

### 3. Run it on iOS / Android

```bash
$ react-native run-ios
```
