import { EventSubscription } from 'fbemitter';
declare type AdManagerCachePolicy = 'none' | 'icon' | 'image' | 'all';
export default class NativeAdsManager {
    private placementId;
    private adsToRequest;
    private isValid;
    private eventEmitter;
    static registerViewsForInteractionAsync(nativeAdViewTag: number, mediaViewTag: number, adIconViewTag: number, clickable: number[]): Promise<any>;
    /**
     * Creates an instance of AdsManager with a given placementId and adsToRequest.
     * Default number of ads to request is `10`.
     *
     * AdsManager will become loading ads immediately
     */
    constructor(placementId: string, adsToRequest?: number);
    /**
     * Listens for AdManager state changes and updates internal state. When it changes,
     * callers will be notified of a change
     */
    private listenForStateChanges;
    /**
     * Used to listening for state changes
     *
     * If manager already became valid, it will call the function w/o registering
     * handler for events
     */
    onAdsLoaded(func: Function): EventSubscription;
    /**
     * Disables auto refreshing for this native ad manager
     */
    disableAutoRefresh(): void;
    /**
     * Set the native ads manager caching policy. This controls which media from
     * the native ads are cached before the onAdsLoaded is called.
     * The default is to not block on caching.
     */
    setMediaCachePolicy(cachePolicy: AdManagerCachePolicy): void;
    toJSON(): string;
}
export {};
