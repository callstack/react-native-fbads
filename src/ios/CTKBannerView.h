//
//  CTKBannerView.h
//  rn-fbads
//
//  Created by Michał Grabowski on 23/01/2017.
//  Copyright © 2017 callstack. All rights reserved.
//

#import "RCTView.h"
#import "RCTComponent.h"
@import UIKit;

@interface CTKBannerView : UIView

@property (nonatomic, copy) RCTBubblingEventBlock onPress;
@property (nonatomic, copy) RCTBubblingEventBlock onError;

@property (nonatomic, strong) NSNumber *size;
@property (nonatomic, strong) NSString *placementId;

@end
