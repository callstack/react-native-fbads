import { NativeModules, NativeEventEmitter } from 'react-native';
import { EventEmitter, EventSubscription } from 'fbemitter';

const { CTKNativeAdManager, CTKNativeAdEmitter } = NativeModules;

const nativeAdEmitter = new NativeEventEmitter(CTKNativeAdEmitter);

const EVENT_DID_BECOME_VALID = 'AdsManagerDidBecomeValid';
const EVENT_DID_BECOME_ERROR = 'AdsManagerGotError';

type AdManagerCachePolicy = 'none' | 'icon' | 'image' | 'all';

export default class NativeAdsManager {
  private placementId: string;

  // Indicates whether AdsManager is ready to serve ads
  private isValid: boolean = false;
  private eventEmitter: EventEmitter = new EventEmitter();

  static async registerViewsForInteractionAsync(
    nativeAdViewTag: number,
    mediaViewTag: number,
    adIconViewTag: number,
    clickable: number[],
  ) {
    if (adIconViewTag > 0 && mediaViewTag > 0) {
      clickable.push(mediaViewTag, adIconViewTag);
    } else if (mediaViewTag > 0) {
      clickable.push(mediaViewTag);
    } else if (adIconViewTag > 0) {
      clickable.push(adIconViewTag);
    }
    const result = await CTKNativeAdManager.registerViewsForInteraction(
      nativeAdViewTag,
      mediaViewTag,
      adIconViewTag,
      clickable,
    );
    return result;
  }

  /**
   * Creates an instance of AdsManager with a given placementId and adsToRequest.
   * Default number of ads to request is `10`.
   *
   * AdsManager will become loading ads immediately
   */
  constructor(placementId: string, adsToRequest: number = 10) {
    this.placementId = placementId;

    this.listenForStateChanges();
    this.listenForErrors();

    CTKNativeAdManager.init(placementId, adsToRequest);
  }

  /**
   * Listens for AdManager state changes and updates internal state. When it changes,
   * callers will be notified of a change
   */
  private listenForStateChanges() {
    nativeAdEmitter.addListener(
      'CTKNativeAdsManagersChanged',
      (managers: Record<string, boolean>) => {
        const isValidNow = managers[this.placementId];

        if (this.isValid !== isValidNow && isValidNow) {
          this.isValid = true;
          this.eventEmitter.emit(EVENT_DID_BECOME_VALID);
        }
      },
    );
  }

  /**
   * Listens for AdManager errors. When error occures,
   * callers will be notified of it
   */
  private listenForErrors() {
    nativeAdEmitter.addListener(
      'onAdError',
      (error: string) => {
          this.eventEmitter.emit(EVENT_DID_BECOME_ERROR, error);
      },
    );
  }

  /**
   * Used to listening for state changes
   *
   * If manager already became valid, it will call the function w/o registering
   * handler for events
   */
  onAdsLoaded(func: Function): EventSubscription {
    if (this.isValid) {
      setTimeout(func);
      return {
        context: null,
        listener: () => {},
        remove: () => {},
      };
    }

    return this.eventEmitter.once(EVENT_DID_BECOME_VALID, func);
  }

  /**
   * Used to listening for errors from this native ad manager
   */
  onAdsError(func: Function): EventSubscription {
    return this.eventEmitter.once(EVENT_DID_BECOME_ERROR, func);
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
