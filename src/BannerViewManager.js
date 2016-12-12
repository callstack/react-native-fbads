import React, { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';


const BANNER_HEIGHT_50 = { width: -1, height: 50 };
const BANNER_HEIGHT_90 = { width: -1, height: 90 };
const RECTANGLE_HEIGHT_250 = { width: -1, height: 250 };

const banner = {
  name: 'BannerView',
  propTypes: {
    placementId: PropTypes.string,
    size: PropTypes.oneOf([BANNER_HEIGHT_50, BANNER_HEIGHT_90, RECTANGLE_HEIGHT_250]),
    onAdPress: PropTypes.func,
    onAdError: PropTypes.func,
    ...View.propTypes,
  },
};

const CTKBannerView = requireNativeComponent('CTKBannerView', banner, {
  onAdPress: true,
  onAdError: true,
});

const BannerView = (props) => {
  const { type } = props;

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

  return (<CTKBannerView {...props} size={size} />);
};

BannerView.propTypes = {
  type: PropTypes.oneOf(['standard', 'large', 'rectangle']),
};

module.exports = BannerView;
