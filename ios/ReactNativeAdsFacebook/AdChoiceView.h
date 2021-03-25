//
//  AdChoiceView.h
//  ReactNativeAdsFacebook
//
//  Created by Suraj Tiwari  on 14/08/18.
//  Copyright © 2018 Suraj Tiwari . All rights reserved.
//

#import <React/RCTView.h>
#import <FBAudienceNetwork/FBAudienceNetwork.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>

@interface AdChoiceView : RCTView

@property (nonatomic, strong) NSString *placementId;
@property (nonatomic) UIRectCorner location;
@property (nonatomic) BOOL *expandable;

- (instancetype)initWithBridge:(RCTBridge *)bridge;

@end
