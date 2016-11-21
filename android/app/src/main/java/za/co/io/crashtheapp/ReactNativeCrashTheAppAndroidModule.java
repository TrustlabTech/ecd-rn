package za.co.io.crashtheapp;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
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
  public final void crashTheApp(final Promise promise) throws Exception {
      throw new Error("because reasons");
  }
}