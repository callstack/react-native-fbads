export interface NativeAd {
  advertiserName: string;
  bodyText: string;
  callToActionText: string;
  headline: string;
  linkDescription: string;
  promotedTranslation: string;
  sponsoredTranslation: string;
  socialContext: string;
  translation: string;
}

export interface HasNativeAd {
  nativeAd: NativeAd;
}
