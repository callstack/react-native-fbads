react-native-fbads
============

> Native Facebook Ads integration for React Native

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

NativeAd may contain any of the following:
- `title`
- `subtitle`
- `description`
- `callToActionText`
- `coverImage`
- `icon`

For details on presence of the above elements, please check official Facebook Audience docs.

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

### 2. FBNativeAdManager

> Public API allowing you to control cache policy and more coming soon. Contributions welcome.
