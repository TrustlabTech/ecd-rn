package za.co.io.crashtheapp;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.joshdholtz.sentry.Sentry;

import java.lang.Error;

public final class ReactNativeCrashTheAppAndroidModule extends ReactContextBaseJavaModule {

  public ReactNativeCrashTheAppAndroidModule(final ReactApplicationContext rctx) {
    super(rctx);
  }

  @Override
  public String getName() {
    return "ReactNativeCrashTheAppAndroid";
  }

  @ReactMethod
  public final void crashTheApp(String message) throws Error {
      throw new Error(message);
  }

  @ReactMethod
  public final void captureMessage(String message) {
    Sentry.captureMessage(message);
  }

  @ReactMethod
  public final void captureEvent(String message, String culprit) {
    Sentry.captureEvent(
      new Sentry.SentryEventBuilder()
        .setMessage(message)
        .setCulprit(culprit)
        .setTimestamp(System.currentTimeMillis())
    );
  }

  @ReactMethod
  public final void addHttpBreadcrumb(String url, String httpMethod, int httpStatusCode) {
    Sentry.addHttpBreadcrumb(url, httpMethod, httpStatusCode );
  }

  @ReactMethod
  public final void addNavigationBreadcrumb(String action, String from, String to) {
    Sentry.addNavigationBreadcrumb(action, from, to);
  }

  @ReactMethod
  public final void addBreadcrumb(String name, String value) {
    Sentry.addBreadcrumb(name, value);
  }

}