import { NativeModules, Platform } from 'react-native';

const { CTKAdSettingsManager } = NativeModules;

type SDKLogLevel =
  | 'none'
  | 'debug'
  | 'verbose'
  | 'warning'
  | 'error'
  | 'notification';

export type TrackingStatus = 'unavailable' | 'denied' | 'authorized' | 'restricted' | 'not-determined';

export default {
  /**
   * Contains hash of the device id
   */
  get currentDeviceHash(): string {
    return CTKAdSettingsManager.currentDeviceHash;
  },

  /**
   * Registers given device with `deviceHash` to receive test Facebook ads.
   */
  addTestDevice(deviceHash: string) {
    CTKAdSettingsManager.addTestDevice(deviceHash);
  },
  /**
   * Clears previously set test devices
   */
  clearTestDevices() {
    CTKAdSettingsManager.clearTestDevices();
  },
  /**
   * Sets current SDK log level
   */
  setLogLevel(logLevel: SDKLogLevel) {
    CTKAdSettingsManager.setLogLevel(logLevel);
  },
  /**
   * Specifies whether ads are treated as child-directed
   */
  setIsChildDirected(isDirected: boolean) {
    CTKAdSettingsManager.setIsChildDirected(isDirected);
  },
  /**
   * Sets mediation service name
   */
  setMediationService(mediationService: string) {
    CTKAdSettingsManager.setMediationService(mediationService);
  },
  /**
   * Sets URL prefix
   */
  setUrlPrefix(urlPrefix: string) {
    CTKAdSettingsManager.setUrlPrefix(urlPrefix);
  },

  /**
   * Requests permission to track the user.
   *
   * Requires a [`NSUserTrackingUsageDescription`](https://developer.apple.com/documentation/bundleresources/information_property_list/nsusertrackingusagedescription) in your `Info.plist`
   *
   * @platform iOS 14
   */
  async requestTrackingPermission(): Promise<TrackingStatus> {
    if (Platform.OS !== 'ios') return 'unavailable';
    return await CTKAdSettingsManager.requestTrackingPermission();
  },
  /**
   * Gets the current tracking status.
   *
   * @platform iOS 14
   */
  async getTrackingStatus(): Promise<TrackingStatus> {
    if (Platform.OS !== 'ios') return 'unavailable';
    return await CTKAdSettingsManager.getTrackingStatus();
  },

  /**
   * Enable or disable the automatic Advertiser ID Collection. On iOS 14 it is recommended to only enable automatic Advertiser ID Collection when the user has granted permission to track. (@see `requestTrackingPermission()`)
   */
  setAdvertiserIDCollectionEnabled(enabled: boolean): void {
    CTKAdSettingsManager.setAdvertiserIDCollectionEnabled(enabled);
  }
};
