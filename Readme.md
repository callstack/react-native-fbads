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

The react-native-fbads has been automatically linked for you, the next step will be downloading and linking the native Facebook SDK for iOS. Make sure you have the latest Xcode installed. Open the .xcodeproj in Xcode found in the ios subfolder from your project's root directory. Now, follow all the steps in the Getting Started Guide for Facebook SDK for iOS. Along with FBSDKCoreKit.framework, don't forget to import FBSDKAudienceNetwork.framework.

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
