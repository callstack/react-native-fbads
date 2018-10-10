import React from 'react';
import { requireNativeComponent } from 'react-native';

const CTKBannerView = requireNativeComponent('CTKBannerView', null, {
  onAdPress: true,
  onAdError: true
});

type AdType = 'large' | 'rectangle' | 'standard';

const sizeForType: Record<AdType, number> = {
  large: 90,
  rectangle: 250,
  standard: 50
};

const getSizeForType = (type: AdType) => sizeForType[type];

interface BannerViewProps {
  type: AdType;
  placementId: string;
  onPress: Function;
  onError: Function;
  style: any;
}

const BannerView = (props: BannerViewProps) => {
  const { type, onPress, onError, style, ...restProps } = props;
  const size = getSizeForType(type);

  return (
    <CTKBannerView
      size={size}
      onAdPress={onPress}
      onAdError={onError}
      style={[style, { height: size }]}
      {...restProps}
    />
  );
};

export default BannerView;
