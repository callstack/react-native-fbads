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
#import "RCTUtils.h"
#import "RCTBridge.h"

@interface CTKNativeAdManager () <FBNativeAdDelegate, FBNativeAdsManagerDelegate>

// FBNativeAdsManager instance that abstracts away the logic required for loading ads
// on a device
@property (nonatomic, strong) FBNativeAdsManager *fbAdManager;

@end

@implementation CTKNativeAdManager

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

// Initialises a new CTKNativeAdManager instance and creates ad manager for a given placement id.
- (instancetype)init {
  self = [super init];
  if (self) {
    _fbAdManager = [[FBNativeAdsManager alloc] initWithPlacementID:[self placementId] forNumAdsRequested:10];

    __weak typeof(self) weakSelf = self;
    [_fbAdManager setDelegate:weakSelf];

    [_fbAdManager loadAds];
  }
  return self;
}

- (NSObject *)constantsToExport {
  return @{
    @"isValid": @([_fbAdManager isValid]),
  };
}

// Retrieves placement identifier as stored in the app plist
- (NSString *)placementId {
  return [[[NSBundle mainBundle] infoDictionary] valueForKeyPath:@"FacebookAdsPlacementID"];
}

// Called when native ads are loaded
- (void)nativeAdsLoaded {
  [_bridge.eventDispatcher sendAppEventWithName:@"CTKNativeAdManagerDidLoad" body:@{}];
}

// Called when native ads fail to load
- (void)nativeAdsFailedToLoadWithError:(NSError *)error {
  [_bridge.eventDispatcher sendAppEventWithName:@"CTKNativeAdManagerDidFail" body:RCTJSErrorFromNSError(error)];
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

@end
