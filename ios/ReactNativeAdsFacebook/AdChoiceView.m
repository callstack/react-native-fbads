//
//  AdChoiceView.m
//  ReactNativeAdsFacebook
//
//  Created by Suraj Tiwari  on 14/08/18.
//  Copyright © 2018 Suraj Tiwari . All rights reserved.
//

#import "AdChoiceView.h"
#import <React/RCTUtils.h>
#import "EXNativeAdManager.h"

@interface AdChoiceView ()
@property (nonatomic, strong) RCTBridge *bridge;
@end

@implementation AdChoiceView

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
    if (self = [super init]) {
        _bridge = bridge;
    }
    return self;
}

- (void)setPlacementId:(NSString *)placementId
{
    _placementId = placementId;
    [self createViewIfCan:_placementId:_location: _expandable];
}

- (void)setLocation:(UIRectCorner *)location
{
    _location = location;
    [self createViewIfCan:_placementId:_location: _expandable];
}

- (void)setExpandable:(BOOL *)expandable
{
    _expandable = expandable;
    [self createViewIfCan:_placementId :_location :_expandable];
}

- (void)createViewIfCan:(NSString *)placementId :(UIRectCorner *) location :(BOOL) expandable
{
    if (!location || !placementId) {
        return;
    }
    EXNativeAdManager *nativeAdManager = [_bridge moduleForClass:[EXNativeAdManager class]];
    FBNativeAdsManager *_adsManager = [nativeAdManager getFBAdsManager:placementId];
    FBNativeAd *nativeAd = [_adsManager nextNativeAd];
    FBAdChoicesView *adChoicesView = [[FBAdChoicesView alloc] initWithNativeAd:nativeAd expandable:expandable];
    [adChoicesView updateFrameFromSuperview:location];
    [self addSubview:adChoicesView];
}

@end
