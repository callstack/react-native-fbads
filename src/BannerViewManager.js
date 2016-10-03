import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var banner = {
  name: 'BannerView',
  propTypes: {
    placementId: PropTypes.string,
    size: PropTypes.object,
    // resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
    ...View.propTypes // include the default view properties
  },
};

module.exports = requireNativeComponent('CTKBannerView', banner);
