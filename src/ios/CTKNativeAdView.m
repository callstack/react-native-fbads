//
//  CTKNativeAdManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 24/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

@import FBAudienceNetwork;
#import "CTKNativeAdView.h"
#import <React/RCTUtils.h>
#import <React/UIView+React.h>
#import "CTKNativeAdClickable.h"

@interface CTKNativeAdView ()

@property (nonatomic, strong) FBAdChoicesView* adChoicesView;

@end

@implementation CTKNativeAdView

- (void)setNativeAd:(FBNativeAd *)nativeAd {
  _nativeAd = nativeAd;

  _onAdLoaded(@{
    @"title": _nativeAd.title,
    @"subtitle": _nativeAd.subtitle,
    @"description": _nativeAd.body,
    @"socialContext": _nativeAd.socialContext,
    @"callToActionText": _nativeAd.callToAction,
    @"coverImage": _nativeAd.coverImage ? [_nativeAd.coverImage.url absoluteString] : [NSNull null],
    @"icon": _nativeAd.icon ? [_nativeAd.icon.url absoluteString] : [NSNull null],
  });
    
    _adChoicesView = [[FBAdChoicesView alloc] initWithNativeAd:nativeAd expandable:NO];
    [self addSubview:_adChoicesView];

  //[_nativeAd registerViewForInteraction:self withViewController:RCTKeyWindow().rootViewController];
}

- (void)didUpdateReactSubviews
{
    [super didUpdateReactSubviews];
    
    [self bringSubviewToFront:_adChoicesView];
    [_adChoicesView updateFrameFromSuperview];
    
    NSMutableArray *clickable = [self getClickableSubviewsFromView:self];
    
    [_nativeAd registerViewForInteraction:self withViewController:RCTKeyWindow().rootViewController withClickableViews:clickable.copy];
}

- (NSMutableArray *)getClickableSubviewsFromView:(UIView *)view {
    if([view isKindOfClass:[CTKNativeAdClickable class]]) {
        return @[view].mutableCopy;
    }
    NSMutableArray *array = @[].mutableCopy;
    for (NSUInteger i = 0; i < view.reactSubviews.count; i++) {
        UIView *subview = [view.reactSubviews objectAtIndex:i];
        [array addObjectsFromArray:[self getClickableSubviewsFromView:subview]];
    }
    
    return array;
}

@end
