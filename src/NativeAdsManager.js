/**
 * NativeAdsManager.js
 * react-native-fbads
 *
 * Created by Mike Grabowski on 24/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import { NativeModules, NativeAppEventEmitter } from 'react-native';
import EventEmitter from 'eventemitter3';

const { CTKNativeAdManager } = NativeModules;

const EVENT_DID_BECOME_VALID = 'AdsManagerDidBecomeValid';
const EVENT_DID_BECOME_INVALID = 'AdsManagerDidBecomeInvalid';

type AdManagerCachePolicy = 'none' | 'icon' | 'image' | 'all';

class NativeAdsManager {
  /** {@string} with placement id of ads **/
  placementId: string;

  /** {@number} of ads to request at once **/
  adsToRequest: number;

  /** {@boolean} indicating whether AdsManager is ready to serve ads **/
  isValid: boolean = false;

  /** {@EventEmitter} used for sending out updates **/
  eventEmitter: EventEmitter = new EventEmitter();

  /**
   * Creates an instance of AdsManager with a given placementId and adsToRequest.
   * Default number of ads to request is `10`.
   *
   * AdsManager will become loading ads immediately
   */
  constructor(placementId: string, adsToRequest: number = 10) {
    this.placementId = placementId;
    this.adsToRequest = adsToRequest;

    this._listenForStateChanges();

    CTKNativeAdManager.init(placementId, adsToRequest);
  }

  /**
   * Listens for AdManager state changes and updates internal state. When it changes,
   * callers will be notified of a change
   */
  _listenForStateChanges() {
    NativeAppEventEmitter.addListener('CTKNativeAdsManagersChanged', (managers) => {
      const isValidNew = managers[this.placementId];
      const isValid = this.isValid;

      if (isValid !== isValidNew) {
        if (isValidNew) {
          this.eventEmitter.emit(EVENT_DID_BECOME_VALID);
        } else {
          this.eventEmitter.emit(EVENT_DID_BECOME_INVALID);
        }

        this.isValid = isValidNew;
      }
    });
  }

  /**
   * Used to listening for state changes
   *
   * If manager already became valid, it will call the function w/o registering
   * handler for events
   */
  onAdsLoaded(func: Function): Function {
    if (this.isValid) {
      setTimeout(func);
      return () => {};
    }

    this.eventEmitter.once(EVENT_DID_BECOME_VALID, func);

    return () => this.eventEmitter.removeListener(EVENT_DID_BECOME_VALID, func);
  }

  /**
   * Disables auto refreshing for this native ad manager
   */
  disableAutoRefresh() {
    CTKNativeAdManager.disableAutoRefresh(this.placementId);
  }

  /**
   * Set the native ads manager caching policy. This controls which media from
   * the native ads are cached before the onAdsLoaded is called.
   * The default is to not block on caching.
   */
  setMediaCachePolicy(cachePolicy: AdManagerCachePolicy) {
    CTKNativeAdManager.setMediaCachePolicy(this.placementId, cachePolicy);
  }

  toJSON() {
    return this.placementId;
  }
}

export default NativeAdsManager;
