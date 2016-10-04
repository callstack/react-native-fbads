import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';


const BANNER_HEIGHT_50 = { width: -1, height: 50 };
const BANNER_HEIGHT_90 = { width: -1, height: 90 };
const RECTANGLE_HEIGHT_250 = { width: -1, height: 250 };

const banner = {
  name: 'BannerView',
  propTypes: {
    placementId: PropTypes.string,
    size: PropTypes.oneOf([BANNER_HEIGHT_50, BANNER_HEIGHT_90, RECTANGLE_HEIGHT_250]),
    onAdClick: PropTypes.func,
    onAdError: PropTypes.func,
    ...View.propTypes,
  },
};

const BannerView = requireNativeComponent('CTKBannerView', banner, {
  onAdClick: true,
  onAdError: true,
});
BannerView.BANNER_HEIGHT_50 = BANNER_HEIGHT_50;
BannerView.BANNER_HEIGHT_90 = BANNER_HEIGHT_90;
BannerView.RECTANGLE_HEIGHT_250 = RECTANGLE_HEIGHT_250;

module.exports = BannerView;
