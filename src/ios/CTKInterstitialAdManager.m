//
//  CTKInterstitialAdManager.m
//  rn-fbads
//
//  Created by Michał Grabowski on 29/09/2016.
//  Copyright © 2016 callstack. All rights reserved.
//

#import "CTKInterstitialAdManager.h"
#import "RCTUtils.h"
@import FBAudienceNetwork;

@interface CTKInterstitialAdManager () <FBInterstitialAdDelegate>

@property (nonatomic, strong) RCTPromiseResolveBlock resolve;
@property (nonatomic, strong) RCTPromiseRejectBlock reject;

@end

@implementation CTKInterstitialAdManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(
  showAd:(NSString *)placementId
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
) {
  RCTAssert(_resolve == nil && _reject == nil, @"Only one `showAd` can be called at once");
  
  _resolve = resolve;
  _reject = reject;
  
  FBInterstitialAd *interstitialAd = [[FBInterstitialAd alloc] initWithPlacementID:placementId];
  interstitialAd.delegate = self;
  [interstitialAd loadAd];
}

#pragma mark - FBInterstitialAdDelegate

- (void)interstitialAdDidLoad:(FBInterstitialAd *)interstitialAd {
  [interstitialAd showAdFromRootViewController:RCTPresentedViewController()];
}

- (void)interstitialAd:(FBInterstitialAd *)interstitialAd didFailWithError:(NSError *)error {
  _reject(@"E_FAILED_TO_LOAD", [error localizedDescription], error);
  
  [self cleanUpPromise];
}

- (void)interstitialAdDidClick:(FBInterstitialAd *)interstitialAd {
  _resolve(@{
    @"reason": @"didClick",
  });
  
  [self cleanUpPromise];
}

- (void)interstitialAdDidClose:(FBInterstitialAd *)interstitialAd {
  _resolve(@{
    @"reason": @"didClose",
  });
  
  [self cleanUpPromise];
}

- (void)cleanUpPromise {
  _reject = nil;
  _resolve = nil;
}

@end
