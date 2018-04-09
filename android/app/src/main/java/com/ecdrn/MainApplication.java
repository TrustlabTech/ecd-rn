/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

package com.ecdrn;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.multidex.MultiDex;
import com.facebook.react.ReactPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

import com.ecdrn.reactnative.ReactNativePackages;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    return com.ecdrn.BuildConfig.DEBUG;
  }

  // multidex support
  // https://developer.android.com/studio/build/multidex.html
  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  // code-push
  @Nullable
  @Override
  public String getJSBundleFile() {
    return CodePush.getJSBundleFile();
  }

  // react-native
  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
            new AppCenterReactNativePackage(MainApplication.this),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, true),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, "ALWAYS"),
            new VectorIconsPackage(),
            new ReactNativePackages(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG)
    );
  }
}
