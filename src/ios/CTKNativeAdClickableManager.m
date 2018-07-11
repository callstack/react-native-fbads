//
//  CTKNativeAdClickableManager.m
//  rn-fbads
//
//  Created by Philip Heinser on 09.03.18.
//  Copyright © 2018 callstack. All rights reserved.
//

#import "CTKNativeAdClickableManager.h"
#import "CTKNativeAdClickable.h"

@implementation CTKNativeAdClickableManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [CTKNativeAdClickable new];
}

@end
