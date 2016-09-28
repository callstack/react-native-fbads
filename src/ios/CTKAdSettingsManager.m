//
//  CTKAdSettingsManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 29/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

#import "CTKAdSettingsManager.h"
#import "RCTUtils.h"
@import FBAudienceNetwork;

@implementation CTKAdSettingsManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addTestDevice:(NSString*)deviceHash) {
  [FBAdSettings addTestDevice:deviceHash];
}

@end
