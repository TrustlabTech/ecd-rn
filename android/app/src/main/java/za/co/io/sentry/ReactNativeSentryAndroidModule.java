package za.co.io.sentry;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.joshdholtz.sentry.Sentry;

import java.lang.Error;

public final class ReactNativeSentryAndroidModule extends ReactContextBaseJavaModule {

  public ReactNativeSentryAndroidModule(final ReactApplicationContext rctx) {
    super(rctx);
  }

  private boolean validString(String string) {
    return string != null && !string.isEmpty() ? true : false;
  }

  @Override
  public String getName() {
    return "ReactNativeSentryAndroid";
  }

  @ReactMethod
  public final void crashTheApp(String message) throws Error {
      throw new Error(message);
  }

  @ReactMethod
  public final void captureMessage(String message) {
    if(this.validString(message)){
      Sentry.captureMessage(message);
    }
  }

  @ReactMethod
  public final void captureEvent(String message, String culprit) {
    if(this.validString(message) && this.validString(culprit)) {
      Sentry.captureEvent(
        new Sentry.SentryEventBuilder()
          .setMessage(message)
          .setCulprit(culprit)
          .setTimestamp(System.currentTimeMillis())
      );
    }

  }

  @ReactMethod
  public final void addHttpBreadcrumb(String url, String httpMethod, int httpStatusCode) {
    if(this.validString(url) && this.validString(httpMethod)) {
      Sentry.addHttpBreadcrumb(url, httpMethod, httpStatusCode );
    }
  }

  @ReactMethod
  public final void addNavigationBreadcrumb(String action, String from, String to) {
    if(this.validString(action) && this.validString(from) && this.validString(to)) {
      Sentry.addNavigationBreadcrumb(action, from, to);
    }
  }

  @ReactMethod
  public final void addBreadcrumb(String name, String value) {
    if(this.validString(name) && this.validString(value)) {
      Sentry.addBreadcrumb(name, value);
    }
  }

}