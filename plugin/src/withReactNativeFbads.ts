import { AndroidConfig, ConfigPlugin, createRunOncePlugin, withAndroidManifest } from "@expo/config-plugins";
import { getMainApplicationOrThrow, prefixAndroidKeys } from "@expo/config-plugins/build/android/Manifest";

const INTERSTITIAL_AD_ACTIVITY = 'com.facebook.ads.InterstitialAdActivity'

export const withFacebookManifest: ConfigPlugin<{} | void> = (
  config,
  props
) => {
  return withAndroidManifest(config, (config) => {
    config.modResults = setFacebookConfig(props, config.modResults);
    return config;
  });
};

export function setFacebookConfig(
  props: any,
  androidManifest: AndroidConfig.Manifest.AndroidManifest
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mainApplication = getMainApplicationOrThrow(androidManifest);
  mainApplication = ensureFacebookActivity({ mainApplication });

  return androidManifest;
}

function ensureFacebookActivity({
  mainApplication,
}: {
  mainApplication: AndroidConfig.Manifest.ManifestApplication;
}) {
  if (Array.isArray(mainApplication.activity)) {
    // Remove all Facebook InterstitialAdActivity first
    mainApplication.activity = mainApplication.activity.filter((activity) => {
      return activity.$?.["android:name"] !== INTERSTITIAL_AD_ACTIVITY;
    });
  } else {
    mainApplication.activity = [];
  }

  mainApplication.activity.push(getFacebookAdActivity());
  return mainApplication;
}

function buildXMLItem({
  head,
  children,
}: {
  head: Record<string, string>;
  children?: Record<string, string | any[]>;
}) {
  return { ...(children ?? {}), $: head };
}

function getFacebookAdActivity() {
  /**
<activity
  android:name="com.facebook.ads.InterstitialAdActivity"
  android:configChanges="keyboardHidden|orientation"
/>
   */
  return buildXMLItem({
    head: prefixAndroidKeys({
      name: INTERSTITIAL_AD_ACTIVITY,
      configChanges: 'keyboardHidden|orientation',
    }),
  }) as AndroidConfig.Manifest.ManifestActivity;
}

/**
 * Apply react-native-fbads configuration for Expo SDK 44 projects.
 */
const withReactNativeFbads: ConfigPlugin<{} | void> = (config, _props = {}) => {
  // Support passing no props to the plugin.
  const props = _props || {};

  config = withFacebookManifest(config, props);

  return config;
};

const pkg = require("react-native-fbads/package.json");

export default createRunOncePlugin(withReactNativeFbads, pkg.name, pkg.version);

