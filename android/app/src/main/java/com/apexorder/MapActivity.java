package com.apexorder;


import android.os.Bundle;
import android.app.Activity;

import com.yandex.mapkit.Animation;
import com.yandex.mapkit.MapKitFactory;
import com.yandex.mapkit.geometry.Point;
import com.yandex.mapkit.map.CameraPosition;

import com.yandex.mapkit.mapview.MapView;

/**
 * This example shows a map and moves the camera to the specified point. 
 * Make sure to request the necessary permissions.
 */
public class MapActivity extends Activity {
    /**
     * Replace "your_api_key" with a valid API key.
     * You can get the key on the website https://developer.tech.yandex.ru/
     */
    private final String MAPKIT_API_KEY = "25f4f416-a30a-4307-a267-ccb470e2f001";
    private final Point TARGET_LOCATION = new Point(59.945933, 30.320045);

    private MapView mapView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
        /**
        * Set the API key before you initialize the MapKitFactory.
        * We recommend that you set the key in Application.onCreate,
        * but in this example, it's set in activity.
        */
        MapKitFactory.setApiKey(MAPKIT_API_KEY);
        /**
        * Initialize the library to load the required native libraries.
        * We recommend that you initialize the MapKit library in the Activity.onCreate method
        * Trying to initialize it in Application.onCreate may result in unnecessary calls and increased battery usage.
        */
        MapKitFactory.initialize(this);
        // Creating a MapView.
        mapView = (MapView)findViewById(R.id.mapview);

        // Relocating the camera to the center of Saint Petersburg.
        mapView.getMap().move(
                new CameraPosition(TARGET_LOCATION, 14.0f, 0.0f, 0.0f),
                new Animation(Animation.Type.SMOOTH, 5),
                null);
    }

    @Override
    protected void onStop() {
        // onStop calls should be passed to MapView and MapKit instances.
        mapView.onStop();
        MapKitFactory.getInstance().onStop();
        super.onStop();
    }

    @Override
    protected void onStart() {
        // onStart calls should be passed to MapView and MapKit instances.
        super.onStart();
        MapKitFactory.getInstance().onStart();
        mapView.onStart();
    }
}   
