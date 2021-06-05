import React from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from "react-native-admob-next";

export const Banner = () => {
  return <AdMobBanner
      adSize="fullBanner"
      adUnitID="ca-app-pub-1725475911866822/8456159960"
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={(error) => console.error(error)}
    />
};

//   // Display a DFP Publisher banner
//   <PublisherBanner
//     adSize="fullBanner"
//     adUnitID="your-admob-unit-id"
//     testDevices={[PublisherBanner.simulatorId]}
//     onAdFailedToLoad={error => console.error(error)}
//     onAppEvent={event => console.log(event.name, event.info)}
//   />

//   // Display an interstitial
//   AdMobInterstitial.setAdUnitID('your-admob-unit-id');
//   AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
//   AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

//   // Display a rewarded ad
//   AdMobRewarded.setAdUnitID('your-admob-unit-id');
//   AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
