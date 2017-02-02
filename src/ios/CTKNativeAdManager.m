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
#import <React/RCTUtils.h>
#import <React/RCTAssert.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>

@implementation RCTConvert (CTKNativeAdView)

RCT_ENUM_CONVERTER(FBNativeAdsCachePolicy, (@{
  @"none": @(FBNativeAdsCachePolicyNone),
  @"icon": @(FBNativeAdsCachePolicyIcon),
  @"image": @(FBNativeAdsCachePolicyCoverImage),
  @"all": @(FBNativeAdsCachePolicyAll),
}), FBNativeAdsCachePolicyNone, integerValue)

@end

@interface CTKNativeAdManager () <FBNativeAdsManagerDelegate>

@property (nonatomic, strong) NSMutableDictionary<NSString*, FBNativeAdsManager*> *adsManagers;

@end

@implementation CTKNativeAdManager

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

- (instancetype)init {
  self = [super init];
  if (self) {
    _adsManagers = [NSMutableDictionary new];
  }
  return self;
}

RCT_EXPORT_METHOD(init:(NSString *)placementId withAdsToRequest:(NSInteger*)adsToRequest) {
  FBNativeAdsManager *adsManager = [[FBNativeAdsManager alloc] initWithPlacementID:placementId forNumAdsRequested:adsToRequest];

  __weak typeof(self) weakSelf = self;
  [adsManager setDelegate:weakSelf];

  [adsManager loadAds];

  [_adsManagers setValue:adsManager forKey:placementId];
}

RCT_EXPORT_METHOD(setMediaCachePolicy:(NSString*)placementId cachePolicy:(FBNativeAdsCachePolicy*)cachePolicy) {
  [_adsManagers[placementId] setMediaCachePolicy:cachePolicy];
}

RCT_EXPORT_METHOD(disableAutoRefresh:(NSString*)placementId) {
  [_adsManagers[placementId] disableAutoRefresh];
}

- (void)nativeAdsLoaded {
  NSMutableDictionary<NSString*, NSNumber*> *adsManagersState = [NSMutableDictionary new];

  [_adsManagers enumerateKeysAndObjectsUsingBlock:^(NSString* key, FBNativeAdsManager* adManager, __unused BOOL* stop) {
    [adsManagersState setValue:@([adManager isValid]) forKey:key];
  }];

  [_bridge.eventDispatcher sendAppEventWithName:@"CTKNativeAdsManagersChanged" body:adsManagersState];
}

- (void)nativeAdsFailedToLoadWithError:(NSError *)error {
  // @todo handle errors here
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (UIView *)view {
  return [CTKNativeAdView new];
}

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(adsManager, NSString, CTKNativeAdView) {
  view.nativeAd = [_adsManagers[json] nextNativeAd];
}

@end
