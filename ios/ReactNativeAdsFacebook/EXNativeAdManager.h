#import <React/RCTViewManager.h>
#import <FBAudienceNetwork/FBAudienceNetwork.h>

@interface EXNativeAdManager : RCTViewManager

- (FBNativeAdsManager *) getFBAdsManager:(NSString *)placementId;

@end
