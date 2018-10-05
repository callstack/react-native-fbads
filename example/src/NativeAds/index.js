import React, {Component} from 'react';
import {View} from 'react-native';
import {NativeAdsManager, AdSettings} from 'react-native-fbads';
import {Container} from "native-base"
import {nativeAdPlacementId} from './../Variables/index'
import NativeAdView from "./NativeAdView";

AdSettings.clearTestDevices();
AdSettings.setLogLevel('debug');
AdSettings.addTestDevice(AdSettings.currentDeviceHash);

const adsManager = new NativeAdsManager(nativeAdPlacementId);


export default class NativeAd extends Component<Props> {
    render() {
        return (
            <Container style={{justifyContent: 'center',backgroundColor:"#fff",padding:20}}>
                <NativeAdView adsManager={adsManager} />
            </Container>
        );
    }
}


