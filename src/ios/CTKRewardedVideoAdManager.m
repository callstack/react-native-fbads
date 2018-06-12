//
//  CTKRewardedVideoAdManager.m
//  rn-fbads
//
//  Created by Logan Hendershot on 4/4/18.
//  Copyright © 2018 callstack. All rights reserved.
//

#import "CTKRewardedVideoAdManager.h"
#import <React/RCTUtils.h>
@import FBAudienceNetwork;

@interface CTKRewardedVideoAdManager () <FBRewardedVideoAdDelegate>
    
@property (nonatomic, strong) RCTPromiseResolveBlock resolveLoad;
@property (nonatomic, strong) RCTPromiseRejectBlock rejectLoad;
@property (nonatomic, strong) RCTPromiseResolveBlock resolveShow;
@property (nonatomic, strong) RCTPromiseRejectBlock rejectShow;
@property (nonatomic, strong) FBRewardedVideoAd *rewardedVideoAd;
@property (nonatomic, strong) RCTResponseSenderBlock callback;

@property (nonatomic) bool didLoad;

@end

@implementation CTKRewardedVideoAdManager;

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(
                  loadAd:(NSString *)placementId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ) {
    NSLog(@"Loading Rewarded Video");
    _resolveLoad = resolve;
    _rejectLoad = reject;
    
    _rewardedVideoAd = [[FBRewardedVideoAd alloc] initWithPlacementID:placementId];
    _rewardedVideoAd.delegate = self;
    [_rewardedVideoAd loadAd];
}

RCT_EXPORT_METHOD(showAd: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if(_didLoad != true) {
        return reject(@"E_FAILED_TO_Show", @"Rewarded video ad not loaded, unable to show.", nil);
    }
    NSLog(@"Showing Ad");
    // set callback to be called by rewardedVideoAdComplete below
    _resolveShow = resolve;
    
    // dispatch async to get main UI thread to show video
    dispatch_async(dispatch_get_main_queue(), ^{
        [_rewardedVideoAd showAdFromRootViewController:RCTPresentedViewController()];
    });
}
- (void)rewardedVideoAd:(FBRewardedVideoAd *)rewardedVideoAd didFailWithError:(NSError *)error
{
    NSLog(@"Rewarded video ad failed to load - Error: %@", error);
    
    _didLoad = false;
    _rejectLoad(@"E_FAILED_TO_LOAD", @"Rewarded video ad failed to load", nil);
}

- (void)rewardedVideoAdDidLoad:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Video ad is loaded and ready to be displayed");
    _didLoad = true;
    _resolveLoad(@"Video ad is loaded and ready to be displayed");
}
- (void)rewardedVideoAdDidClick:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Video ad clicked");
}
- (void)rewardedVideoAdComplete:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded Video ad video complete - init reward");
    
    _resolveShow(@"Rewarded video ad completed successfully.");
    
    [self cleanUpPromise];
}
- (void)rewardedVideoAdDidClose:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded Video ad closed - this can be triggered by closing the application, or closing the video end card");
}
- (void)rewardedVideoAdWillClose:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"The user clicked on the close button, the ad is just about to close");
}

- (void)rewardedVideoAdWillLogImpression:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded Video impression is being captured");
}

- (void)cleanUpPromise {
    _rejectLoad = nil;
    _resolveLoad = nil;
    _rejectShow = nil;
    _resolveShow = nil;
    _didLoad = false;
}
@end

