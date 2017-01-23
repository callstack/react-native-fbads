//
//  CTKBannerViewManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 23/01/2017.
//  Copyright © 2017 callstack. All rights reserved.
//

#import "CTKBannerViewManager.h"
#import "CTKBannerView.h"

@implementation CTKBannerViewManager

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

- (UIView *)view {
  return [CTKBannerView new];
}

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTBubblingEventBlock)

@end
