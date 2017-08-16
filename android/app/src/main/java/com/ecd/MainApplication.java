/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

package com.ecd;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.multidex.MultiDex;

import com.ecd.reactnative.ReactNativePackages;
import com.facebook.react.ReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // multidex support
  // https://developer.android.com/studio/build/multidex.html
  /*@Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  */

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
            new VectorIconsPackage(),
            new ReactNativePackages(),
            new GoogleAnalyticsBridgePackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG)
    );
  }
}
