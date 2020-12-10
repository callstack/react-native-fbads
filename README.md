# react-native-fbads [![npm version][version-badge]][package]

[![chat][chat-badge]][chat]

[![Facebook Ads](http://i.imgur.com/yH3s6rd.png)](https://developers.facebook.com/products/app-monetization)

**Facebook Audience SDK** integration for React Native, available on iOS and Android. Features native, interstitial and banner ads.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Interstitial Ads](#interstitial-ads)
  - [Native Ads](#native-ads)
  - [Banner View](#bannerview)
- [API](#api)
  - [NativeAdsManager](#nativeadsmanager)
  - [AdSettings](#adsettings)
- [Running the example](#running-the-example)
  - [Install dependencies](#1-install-dependencies)
  - [Start packager](#2-start-packager)
  - [Run it on iOS / Android](#3-run-it-on-ios--android)
- [Credits](#credits)

## Installation

### 1. Integrate the base Facebook SDK

Follow the instructions on [react-native-fbsdk](https://github.com/facebook/react-native-fbsdk) to integrate the Facebook SDK into your project.
Note that for iOS, it's [recommended you use Cocoapods](https://developers.facebook.com/docs/ios/getting-started/advanced) rather than the manual installation.

### 2. Integrate Facebook Audience Network

#### For iOS:

1. Run `pod install` in the `ios/` directory

If you didn't use Cocoapods to integrate the Facebook SDK, you'll need to manually add the audience network framework file to your project.

#### For Android:

1. The library will automatically add audience-network-sdk to your dependencies. There is no need to add the audience network artifact to your build.gradle.

2. In `MainApplication.java`, initialize the SDK inside `onCreate`:

```java

import suraj.tiwari.reactnativefbads.FBAdsPackage; // <-- add this

public class MainApplication extends Application implements ReactApplication {
...
  @Override
  public void onCreate() {
    super.onCreate();
  }
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
          new FBAdsPackage()   // <-- add this
    );
  }
...
}
```

### 3. Install The Javascript Package

Add the package to your project using your favorite package manager

```bash
$ yarn add react-native-fbads
```

Link the native dependencies

```bash
$ react-native link react-native-fbads
```

#### Fix typo in settings.gradle

Replace this

`project(':react-native-fbads').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbads/android/')`

With this

`project(':react-native-fbads').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbads/android/app')`

#### For RN < 0.60

If you have more than one Targets on your Xcode project, you might link some of them manually by dragging `Libraries/ReactNativeAdsFacebook.xcodeproj/Products/libReactNativeAdsFacebook.a` to 'Build Phases' -> 'Link Binary With Libraries'.

#### For RN >= 0.60

If you are working with RN > 0.60 kindly add the following line in your `Podfile`

```
pod 'ReactNativeAdsFacebook', :path => '../node_modules/react-native-fbads'
```

### 4. Get a Placement ID

Follow [Facebook's instructions](https://www.facebook.com/help/publisher/1195459597167215) to create placement IDs for your ads.

You can skip the _Integrate the SDK_ step of that guide, as you've already integrated the Facebook SDK in previous steps.

## Usage

### Interstitial Ads

An Interstitial Ad is a an ad that covers the whole screen with media content. It has a dismiss button as well as the clickable area that takes user outside of your app.

<img src="https://cloud.githubusercontent.com/assets/2464966/19014517/3cea1da2-87ef-11e6-9f5a-6f3dbccc18a2.png" height="500">

Interstitial ads are displayed over your root view with a single, imperative call.

On android, you'll need to add the following to your `AndroidManifest.xml`:

```xml
<activity
  android:name="com.facebook.ads.InterstitialAdActivity"
  android:configChanges="keyboardHidden|orientation" />
```

Usage:

```js
import { InterstitialAdManager } from 'react-native-fbads';

InterstitialAdManager.showAd(placementId)
  .then((didClick) => {})
  .catch((error) => {});
```

The `showAd` method returns a promise that will be resolves once the ad has been either dismissed or clicked by the user. The promise will reject if an error occurs before displaying the ad, such as a network error.

If you want to preload the ad and show it later you can use this instead:

```js
import { InterstitialAdManager } from 'react-native-fbads';

InterstitialAdManager.preloadAd(placementId)
  .then((didClick) => {})
  .catch((error) => {});

// Will show it if already loaded, or wait for it to load and show it.
InterstitialAdManager.showPreloadedAd(placementId);
```

### Native Ads

Native Ads allow you to create custom ad layouts that match your app. Before proceeding, please review [Facebook's documentation on Native Ads](https://developers.facebook.com/docs/audience-network/native-ads/) to get a better understanding of the requirements Native Ads impose.

<img src="https://cloud.githubusercontent.com/assets/2464966/18811079/52c99932-829e-11e6-9a3d-218569d71a6d.png" height="500" />

#### 1. Create the ads manager

```js
import { NativeAdsManager } from 'react-native-fbads';

const adsManager = new NativeAdsManager(placementId, numberOfAdsToRequest);
```

The constructor accepts two parameters:

- `placementId` - which is an unique identifier describing your ad units,
- `numberOfAdsToRequest` - which is a number of ads to request by ads manager at a time, defaults to 10.

#### 2. Create your component

Your component will have access to the following properties, under the `nativeAd` prop:

- `advertiserName` - The name of the Facebook Page or mobile app that represents the business running each ad.
- `headline` - The headline that the advertiser entered when they created their ad. This is usually the ad's main title.
- `linkDescription` - Additional information that the advertiser may have entered.
- `translation` - The word 'ad', translated into the language based upon Facebook app language setting.
- `promotedTranslation` - The word 'promoted', translated into the language based upon Facebook app language setting.
- `sponsoredTranslation` - The word 'sponsored', translated into the language based upon Facebook app language setting.
- `bodyText` - Ad body
- `callToActionText` - Call to action phrase, e.g. - "Install Now"
- `socialContext` - social context for the Ad, for example "Over half a million users"

In addition, you'll have access to the following components:

- `MediaView` for displaying Media ads
- `AdIconView` for displaying the ad's icon
- `AdChoicesView` for displaying the Facebook AdChoices icon.
- `TriggerableView` for wrapping `Text` so it will respond to user clicks.

Please ensure you've reviewed Facebook's instructions to get a better understanding of each of these components and how you should use them.

```js
import {
  AdIconView,
  MediaView,
  AdChoicesView,
  TriggerableView,
} from 'react-native-fbads';
class AdComponent extends React.Component {
  render() {
    return (
      <View>
        <AdChoicesView style={{ position: 'absolute', left: 0, top: 0 }} />
        <AdIconView style={{ width: 50, height: 50 }} />
        <MediaView style={{ width: 160, height: 90 }} />
        <TriggerableView>
          <Text>{this.props.nativeAd.description}</Text>
        </TriggerableView>
      </View>
    );
  }
}

export default withNativeAd(AdComponent);
```

#### 4. Displaying Facebook Ad Choices Icon

Facebook's guidelines require every native ad to include the Ad Choices view, which contains a small clickable icon.
You can use the included `AdChoicesView` component and style it to your liking.

#### Example usage

```js
import { AdChoicesView } from 'react-native-fbads';

<AdChoicesView style={{ position: 'absolute', left: 0, top: 0 }} />;
```

#### Props

| prop       | default   | required | description                                            |
| ---------- | --------- | -------- | ------------------------------------------------------ |
| style      | undefined | false    | Standard Style prop                                    |
| expandable | false     | false    | (iOS only) makes the native AdChoices expandable       |
| location   | topLeft   | false    | (iOS only) controls the location of the AdChoices icon |

#### 5. Showing the ad

Finally, wrap your component with the `withNativeAd` HOC and pass it the `adsManager` you've previously created.

```js
class MyAd {
 ...
}
export const AdComponent = withNativeAd(MyAd);

class MainApp extends React.Component {
  render() {
    return (
      <View>
        <AdComponent adsManager={adsManager} />
      </View>
    );
  }
}
```

### BannerView

BannerView is a component that allows you to display ads in a banner format (know as _AdView_).

Banners are available in 3 sizes:

- `standard` (BANNER_HEIGHT_50)
- `large` (BANNER_HEIGHT_90)
- `rectangle` (RECTANGLE_HEIGHT_250)

```js
import { BannerView } from 'react-native-fbads';

function ViewWithBanner(props) {
  return (
    <View>
      <BannerView
        placementId="YOUR_BANNER_PLACEMENT_ID"
        type="standard"
        onPress={() => console.log('click')}
        onLoad={() => console.log('loaded')}
        onError={(err) => console.log('error', err)}
      />
    </View>
  );
}
```

## API

### NativeAdsManager

Provides a mechanism to fetch a set of ads and then use them within your application. The native ads manager supports giving out as many ads as needed by cloning over the set of ads it got back from the server which can be useful for feed scenarios. It's a wrapper for [`FBNativeAdsManager`](https://developers.facebook.com/docs/reference/ios/current/class/FBNativeAdsManager/)

#### disableAutoRefresh

By default the native ads manager will refresh its ads periodically. This does not mean that any ads which are shown in the application's UI will be refreshed but simply that requesting next native ads to render may return new ads at different times. This method disables that functionality.

```js
adsManager.disableAutoRefresh();
```

#### setMediaCachePolicy

Sets the native ads manager caching policy. This controls which media from the native ads are cached before being displayed. The default is to not block on caching.

```js
adsManager.setMediaCachePolicy('none' | 'icon' | 'image' | 'all');
```

**Note:** This method is a noop on Android

### AdSettings

```js
import { AdSettings } from 'react-native-fbads';
```

AdSettings contains global settings for all ad controls.

#### currentDeviceHash

Constant which contains current device's hash id.

#### addTestDevice

Registers given device to receive test ads. When running on a real device, call this method with the result of `AdSettings.currentDeviceHash` to get test ads.
Do not call this method in production.

You should register test devices before displaying any ads or creating any ad managers.

```js
AdSettings.addTestDevice('hash');
```

#### clearTestDevices

Clears all previously set test devices. If you want your ads to respect newly set config, you'll have to destroy and create
an instance of AdsManager once again.

```js
AdSettings.clearTestDevices();
```

#### setLogLevel

Sets current SDK log level.

```js
AdSettings.setLogLevel(
  'none' | 'debug' | 'verbose' | 'warning' | 'error' | 'notification'
);
```

**Note:** This method is a noop on Android.

#### setIsChildDirected

Configures the ad control for treatment as child-directed.

```js
AdSettings.setIsChildDirected(true | false);
```

#### setMediationService

If an ad provided service is mediating Audience Network in their sdk, it is required to set the name of the mediation service

```js
AdSettings.setMediationService('foobar');
```

#### setUrlPrefix

Sets the url prefix to use when making ad requests.

```js
AdSettings.setUrlPrefix('...');
```

**Note:** This method should never be used in production

## Running the example

In order to see ads you will have to create your own `placementId` and use it instead of the one provided in the examples. This is our internal set up that doesn't work for any developers outside of Callstack.io organisation. This is because of Facebook not showing test ads to outside collaborators in the development mode.

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
$ cd ./example && npm run ios
$ cd ./example && npm run android
```

### Credits

Some of the API explanations were borrowed from Facebook SDK documentation.

<!-- badges -->

[version-badge]: https://img.shields.io/npm/v/react-native-fbads.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-fbads
[chat-badge]: https://img.shields.io/discord/426714625279524876.svg?style=flat-square&colorB=758ED3
[chat]: https://discord.gg/zwR2Cdh
