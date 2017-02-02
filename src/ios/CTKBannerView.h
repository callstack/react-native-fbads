//
//  CTKBannerView.h
//  rn-fbads
//
//  Created by Michał Grabowski on 23/01/2017.
//  Copyright © 2017 callstack. All rights reserved.
//

#import <React/RCTView.h>
#import <React/RCTComponent.h>
@import UIKit;

@interface CTKBannerView : UIView

@property (nonatomic, copy) RCTBubblingEventBlock onAdPress;
@property (nonatomic, copy) RCTBubblingEventBlock onAdError;

@property (nonatomic, strong) NSNumber *size;
@property (nonatomic, strong) NSString *placementId;

@end
