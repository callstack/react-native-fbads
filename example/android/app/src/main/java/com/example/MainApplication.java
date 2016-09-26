package com.example;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import io.callstack.react.fbads.FBAdsPackage;

import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new FBAdsPackage()
          );
        }

        @Override
        protected String getJSMainModuleName() {
            return "example/index";
        }

    };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
