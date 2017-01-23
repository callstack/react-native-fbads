import React, { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const BANNER_HEIGHT_50 = { width: -1, height: 50 };
const BANNER_HEIGHT_90 = { width: -1, height: 90 };
const RECTANGLE_HEIGHT_250 = { width: -1, height: 250 };

const banner = {
  name: 'BannerView',
  propTypes: {
    ...View.propTypes,
    placementId: PropTypes.string,
    size: PropTypes.oneOf([BANNER_HEIGHT_50, BANNER_HEIGHT_90, RECTANGLE_HEIGHT_250]),
    onAdPress: PropTypes.func,
    onAdError: PropTypes.func,
  },
};

const CTKBannerView = requireNativeComponent('CTKBannerView', banner, {
  onAdPress: true,
  onAdError: true,
});

const BannerView = (props) => {
  const { type, onPress, onError, style, ...restProps } = props;

  let size = null;
  switch (type) {
    case 'large':
      size = BANNER_HEIGHT_90;
      break;
    case 'rectangle':
      size = RECTANGLE_HEIGHT_250;
      break;
    default:
      size = BANNER_HEIGHT_50;
  }

  return (
    <CTKBannerView
      size={size}
      onAdPress={onPress}
      onAdError={onError}
      style={[style, { height: size.height }]}
      {...restProps}
    />
  );
};

BannerView.propTypes = {
  ...View.propTypes,
  type: PropTypes.oneOf(['standard', 'large', 'rectangle']),
  onPress: PropTypes.func,
  onError: PropTypes.func,
};

module.exports = BannerView;
