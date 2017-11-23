/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */
package foundation.ixo.amply.ecd;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.crashlytics.android.Crashlytics;
import com.facebook.common.logging.FLog;
import com.reactnativenavigation.controllers.SplashActivity;

import foundation.ixo.amply.ecd.reactnative.FabricLogger;
import io.fabric.sdk.android.Fabric;

public class MainActivity extends SplashActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Fabric.with(this, new Crashlytics());

        FabricLogger logger = new FabricLogger().getInstance();
        logger.setApplicationTag(getPackageName());
        logger.setMinimumLoggingLevel(Log.INFO);

        FLog.setLoggingDelegate(logger);
    }

    @Override
    public View createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView appTitle = new TextView(this);
        TextView companyName = new TextView(this);
        ImageView logo = new ImageView(this);

        view.setOrientation(LinearLayout.VERTICAL);
        view.setGravity(Gravity.CENTER_VERTICAL);
        view.setBackgroundColor(Color.parseColor("#FFFFFF"));

        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);

        int width = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 192, getResources().getDisplayMetrics());
        int height = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 192, getResources().getDisplayMetrics());

        LinearLayout.LayoutParams imageParams = new LinearLayout.LayoutParams(width, height);
        imageParams.gravity = Gravity.CENTER_HORIZONTAL;
        imageParams.setMargins(0, 0, 0, (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 40, getResources().getDisplayMetrics()));

        logo.setLayoutParams(imageParams);
        logo.setImageResource(R.drawable.splash);

        companyName.setLayoutParams(layoutParams);
        companyName.setGravity(Gravity.CENTER_HORIZONTAL);
        companyName.setText("Amply Platform");
        companyName.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        appTitle.setLayoutParams(layoutParams);
        appTitle.setGravity(Gravity.CENTER_HORIZONTAL);
        appTitle.setText("Early Childhood Development");
        appTitle.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 20);

        view.addView(logo);
        view.addView(companyName);
        view.addView(appTitle);

        return view;
    }
}
