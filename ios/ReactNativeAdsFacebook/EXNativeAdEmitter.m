#import "EXNativeAdEmitter.h"

@implementation EXNativeAdEmitter

RCT_EXPORT_MODULE(CTKNativeAdEmitter)

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"CTKNativeAdsManagersChanged", @"onAdError"];
}

- (void)sendManagersState:(NSDictionary<NSString *,NSNumber *> *)adManagersState {
  [self sendEventWithName:@"CTKNativeAdsManagersChanged" body:adManagersState];
}

- (void)sendError:(NSString *)error {
    [self sendEventWithName:@"onAdError" body:error];
}

@end
