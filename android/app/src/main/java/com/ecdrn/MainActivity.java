package com.ecdrn;

import com.facebook.react.ReactActivity;
import com.joshdholtz.sentry.Sentry;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    private static final String TAG = "MainActivity";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // We're gonna grab this from the manifest soon
        Sentry.init(this,"https://8479770f5399479eaeac33c033fd179d:8d704b7b75d84896be7cbc1b398514d6@sentry.io/114660",true);
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
