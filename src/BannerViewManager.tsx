import React from 'react';
import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

type AdType = 'large' | 'rectangle' | 'standard';

interface NativeBannerViewProps {
  size: number;
  onAdPress: Function;
  onAdError: Function;
  style: StyleProp<ViewStyle>;
  placementId: string;
}

interface BannerViewProps {
  type: AdType;
  placementId: string;
  onPress: Function;
  onError: Function;
  style: StyleProp<ViewStyle>;
}

// tslint:disable-next-line:variable-name
const CTKBannerView = requireNativeComponent<NativeBannerViewProps>(
  'CTKBannerView',
  undefined,
  {
    onAdPress: true,
    onAdError: true,
  },
);

const sizeForType: Record<AdType, number> = {
  large: 90,
  rectangle: 250,
  standard: 50,
};

const getSizeForType = (type: AdType) => sizeForType[type];

// tslint:disable-next-line:variable-name
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
