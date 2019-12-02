//
//  AdChoiceManager.m
//  ReactNativeAdsFacebook
//
//  Created by Suraj Tiwari  on 14/08/18.
//  Copyright © 2018 Suraj Tiwari . All rights reserved.
//
#import "AdChoiceManager.h"
#import "EXNativeAdManager.h"
#import "AdChoiceView.h"
#import <React/RCTConvert.h>

@implementation RCTConvert (AdChoiceView)

RCT_ENUM_CONVERTER(UIRectCorner, (@{
                                           @"topRight": @(UIRectCornerTopRight),
                                           @"topLeft": @(UIRectCornerTopLeft),
                                           @"bottomLeft": @(UIRectCornerBottomLeft),
                                           @"bottomRight": @(UIRectCornerBottomRight)
                                           }), UIRectCornerTopRight, intValue )
@end

@implementation AdChoiceManager

RCT_EXPORT_MODULE(AdChoicesView)

@synthesize bridge = _bridge;

- (instancetype)init
{
    self = [super init];
    return self;
}

- (UIView *)view
{
    return [[AdChoiceView new] initWithBridge:_bridge];
}

+ (BOOL) requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_VIEW_PROPERTY(placementId,NSString);
RCT_EXPORT_VIEW_PROPERTY(location,UIRectCorner);
RCT_EXPORT_VIEW_PROPERTY(expandable,BOOL);

@end

