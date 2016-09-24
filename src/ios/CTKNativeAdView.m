//
//  CTKNativeAdManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 24/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

@import FBAudienceNetwork;
#import "CTKNativeAdView.h"
#import "RCTUtils.h"

@interface CTKNativeAdView ()

// Boolean indicating whether an event has been already sent to Javascript
@property (nonatomic) BOOL sentAdEventToJS;

// NativeAd this view has been loaded with
@property (nonatomic, strong) FBNativeAd* nativeAd;

@end

@implementation CTKNativeAdView

- (instancetype)initWithNativeAd:(FBNativeAd *)nativeAd {
  self = [super init];
  if (self) {
    _nativeAd = nativeAd;
  }
  return self;
}

// Since there's no `viewDidLoad` in a UIView, we use `layoutSubviews` combined with `_sentEventToJS`
// to get the opportunity to send back an information whether native ad has been loaded
- (void)layoutSubviews {
  [super layoutSubviews];

  if (_sentAdEventToJS) {
    return;
  }

  _sentAdEventToJS = YES;

  if (_nativeAd) {
    _onAdLoaded(@{
      @"title": _nativeAd.title,
      @"subtitle": _nativeAd.subtitle,
      @"description": _nativeAd.body,
      @"callToActionText": _nativeAd.callToAction,
      @"coverImage": [_nativeAd.coverImage.url absoluteString],
      @"icon": [_nativeAd.icon.url absoluteString],
    });
    [_nativeAd registerViewForInteraction:self withViewController:RCTKeyWindow().rootViewController];
  } else {
    _onAdFailed(@{});
  }
}

@end