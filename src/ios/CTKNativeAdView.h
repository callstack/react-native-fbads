//
//  CTKNativeAdManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 24/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

#import <FBAudienceNetwork/FBNativeAd.h>
#import "React/RCTView.h"
#import "React/RCTComponent.h"

@interface CTKNativeAdView : RCTView

// `onAdLoaded` event called when ad has been loaded
@property (nonatomic, copy) RCTBubblingEventBlock onAdLoaded;

// NativeAd this view has been loaded with
@property (nonatomic, strong) FBNativeAd* nativeAd;

@end
