//
//  CTKNativeAdManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 24/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

#import <FBAudienceNetwork/FBNativeAd.h>
#import "RCTView.h"
#import "RCTComponent.h"

@interface CTKNativeAdView : RCTView

// `onAdLoaded` event called when ad has been loaded
@property (nonatomic, copy) RCTBubblingEventBlock onAdLoaded;

// `onAdFailed` event called when ad has failed to load
@property (nonatomic, copy) RCTBubblingEventBlock onAdFailed;

// Designated initialiser that creates an instance of CTKNativeAdView
// for a given Facebook Native Ad
- (instancetype)initWithNativeAd:(FBNativeAd *)nativeAd;

@end
