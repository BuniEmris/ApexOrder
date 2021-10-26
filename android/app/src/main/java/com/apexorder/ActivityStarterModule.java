package com.apexorder;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.content.Intent;

public class ActivityStarterModule extends ReactContextBaseJavaModule {
    ActivityStarterModule(ReactApplicationContext context) {
        super(context);
    }


    @Override
    public String getName() {
        return "ActivityStarterModule";
    }


    @ReactMethod
    void navigateToMap() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, MapActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
        context.startActivity(intent);
    }
}