//
//  CTKAdSettingsManager.m
//  rn-fbads
//
//  Created by Mike Grabowski on 29/09/16.
//  Copyright © 2016 Callstack.io. All rights reserved.
//

#import "CTKAdSettingsManager.h"
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>
@import FBAudienceNetwork;

@implementation RCTConvert (CTKNativeAdView)

RCT_ENUM_CONVERTER(FBAdLogLevel, (@{
  @"none": @(FBAdLogLevelNone),
  @"debug": @(FBAdLogLevelDebug),
  @"verbose": @(FBAdLogLevelVerbose),
  @"warning": @(FBAdLogLevelWarning),
  @"notification": @(FBAdLogLevelNotification),
  @"error": @(FBAdLogLevelError),
}), FBAdLogLevelDebug, integerValue)

@end

@implementation CTKAdSettingsManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addTestDevice) {
  [FBAdSettings addTestDevice:[FBAdSettings testDeviceHash]];
}

RCT_EXPORT_METHOD(clearTestDevices) {
  [FBAdSettings clearTestDevices];
}

RCT_EXPORT_METHOD(setLogLevel:(FBAdLogLevel)logLevel) {
  [FBAdSettings setLogLevel:logLevel];
}

RCT_EXPORT_METHOD(setIsChildDirected:(BOOL)isDirected) {
  [FBAdSettings setIsChildDirected:isDirected];
}

RCT_EXPORT_METHOD(setMediationService:(NSString *)mediationService) {
  [FBAdSettings setMediationService:mediationService];
}

RCT_EXPORT_METHOD(setUrlPrefix:(NSString *)urlPrefix) {
  [FBAdSettings setUrlPrefix:urlPrefix];
}


@end
