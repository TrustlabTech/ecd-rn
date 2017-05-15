package com.ecdrn;

import com.facebook.react.ReactActivity;
import com.joshdholtz.sentry.Sentry;
import android.os.Bundle;
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import android.util.Log;

import android.content.pm.PackageManager.NameNotFoundException;
import java.lang.NullPointerException;
import java.util.Set;

public class MainActivity extends ReactActivity {

    private static final String TAG = "MainActivity";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // We're gonna grab this from the manifest soon
        Sentry.init(this,"<ECD_APP_SENTRY_DSN>",true);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Ecdrn";
    }
}
