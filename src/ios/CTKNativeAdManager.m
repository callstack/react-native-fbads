//
//  CTKNativeAdManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 24/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

@import FBAudienceNetwork;
#import "CTKNativeAdManager.h"
#import "CTKNativeAdView.h"
#import "RCTBridge.h"

@interface CTKNativeAdManager () <FBNativeAdDelegate>

// FBNativeAdsManager instance that abstracts away the logic required for loading ads
// on a device
@property (nonatomic, strong) FBNativeAdsManager *fbAdManager;

@end

@implementation CTKNativeAdManager

RCT_EXPORT_MODULE()

// Initialises a new CTKNativeAdManager instance and creates ad manager for a given placement id.
- (instancetype)init {
  self = [super init];
  if (self) {
    NSString *placementId = [[[NSBundle mainBundle] infoDictionary] valueForKeyPath:@"facebook_ads_placement_id"];
    _fbAdManager = [[FBNativeAdsManager alloc] initWithPlacementID:placementId forNumAdsRequested:10];
    [_fbAdManager loadAds];
  }
  return self;
}

// All calls are on a main thread due to `FBNativeAdsManager`
- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

// CTKNativeAdView that this manager manages
- (UIView *)view {
  return [[CTKNativeAdView alloc] initWithNativeAd:[_fbAdManager nextNativeAd]];
}

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdFailed, RCTBubblingEventBlock)

@end