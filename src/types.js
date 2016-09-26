/**
 * NativeAdType.js
 * react-native-fbads
 *
 * Created by Mike Grabowski on 24/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

// JS version of FBNativeAd
export type NativeAd = {
  // URL to ad icon image
  icon: ?string,

  // URL to ad cover image creative
  coverImage: ?string,

  // Ad title
  title: ?string,

  // Ad subtitle
  subtitle: ?string,

  // Body text, usually a longer description of the ad.
  description: ?string,

  // Call to action phrase of the ad, for example "Install Now".
  callToActionText: ?string,

  // Ad social context, for example "Over half a million users".
  socialContext: ?string,
}
