package com.ecdrn;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.util.Log;

import com.crashlytics.android.Crashlytics;
import com.ecdrn.reactnative.FabricLogger;
import com.facebook.common.logging.FLog;
import com.facebook.react.ReactActivity;

import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Ecdrn";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        Fabric.with(this, new Crashlytics());

        FabricLogger logger = new FabricLogger().getInstance();
        logger.setApplicationTag(getPackageName());
        logger.setMinimumLoggingLevel(Log.INFO);

        FLog.setLoggingDelegate(logger);
    }
}
