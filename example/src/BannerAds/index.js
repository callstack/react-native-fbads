import React, {Component} from 'react';
import {StyleSheet, Dimensions,View} from 'react-native'
import {Container} from 'native-base';
import {bannerAdPlacementId} from "../Variables";

import {BannerView} from 'react-native-fbads';

let {width, height} = Dimensions.get('window');

export default class BannerAd extends Component<Props> {

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.bannerContainer}>
                    <BannerView
                        placementId={bannerAdPlacementId}
                        type="standard"
                        onPress={() => console.log('click')}
                        onError={(err) => console.log('error', err)}
                    />
                </View>
                <View style={styles.bannerContainer}>
                    <BannerView
                        placementId={bannerAdPlacementId}
                        type="large"
                        onPress={() => console.log('click')}
                        onError={(err) => console.log('error', err)}
                    />
                </View>
                <View style={styles.bannerContainer}>
                    <BannerView
                        placementId={bannerAdPlacementId}
                        type="rectangle"
                        onPress={() => console.log('click')}
                        onError={(err) => console.log('error', err)}
                    />
                </View>
            </Container>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    bannerContainer:{
        marginVertical: 10
    },
});
