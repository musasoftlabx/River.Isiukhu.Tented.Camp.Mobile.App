# River.Isiukhu.Tented.Camp.Mobile.App

A mobile ERP system to manage Restaurant &amp; Accommodation

#### If having issues installing bundler on ios, run

`brew update`

`brew install ruby-build`

`brew install rbenv`

`rbenv install 2.7.5`

`rbenv global 2.7.5`

`echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc`

`echo 'eval "$(rbenv init -)"' >> ~/.zshrc`

.

# React Native Setup & Installation gist

_(Ctrl+Shift+V) to preview in VScode_

`npx react-native init foresee_crm --template react-native-template-typescript`

`cd projectname`

#

_(Optional step) Just ensures app is building without errors_

`yarn android`

`yarn ios`

> If no build errors, Ctrl+C on terminal

`yarn add @react-navigation/native react-native-screens react-native-safe-area-context`

`yarn add react-native-gesture-handler react-native-reanimated`

`yarn add @react-navigation/stack`

`yarn add @react-navigation/drawer`

`yarn add @react-navigation/bottom-tabs`

`yarn add react-native-animated-nav-tab-bar styled-components` (alternative) `yarn add @gorhom/animated-tabbar`

`yarn add react-native-modalize`

`yarn add react-native-paper`

`yarn add react-native-vector-icons`

`yarn add -D @types/react-native-vector-icons`

`yarn add react-native-tab-view react-native-pager-view`

`yarn add @react-navigation/material-top-tabs`

#

> **React Navigation config**
>
> **Touch** android/app/src/main/java/com/projectname/MainApplication.java
>
> > Add
> >
> > ```java
> > import android.os.Bundle; //! Added: musa | react-navigation | 01/04/2023 - 5:43pm
> > ```
> >
> > After the other imports
>
> > Add
> >
> > ```java
> > //! Added: musa | react-navigation | 15/12/2022 - 4:31pm
> > @Override
> > protected void onCreate(Bundle savedInstanceState) {
> >   super.onCreate(null);
> > }
> > ```
> >
> > After
> >
> > ```java
> > //! Added: musa | react-navigation | 15/12/2022 - 4:31pm
> > @Override
> > protected ReactActivityDelegate createReactActivityDelegate() {
> >   return new MainActivityDelegate(this, getMainComponentName());
> > }
> > ```
> >
> > Check docs if any issues https://reactnavigation.org/docs/getting-started

#

> **React Native Reanimated config**
>
> **Touch** babel.config.js
>
> > Add
> >
> > ```js
> > plugins: ['react-native-reanimated/plugin'], //! Added: musa | react-native-reanimated | 01/04/2023 - 5:43pm
> > ```
> >
> > As the last item inside modules.export {...}
> >
> > If app fails to render, Run `yarn start --reset-cache` to address issue
> >
> > Check docs if any issues https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/

#

> **React Native Vector Icons config**
>
> **Touch** android/app/build.gradle
>
> > Add
> >
> > ```java
> > apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
> > ```
> >
> > At the end of file
>
> > > **For IOS**
>
> > Follow instructions on https://dera.hashnode.dev/how-to-set-up-react-native-vector-icons

#

`react-native run-android`

> If no build errors, Ctrl+C on terminal

`yarn add axios formik yup zustand @tanstack/react-query react-native-responsive-fontsize react-native-linear-gradient @react-native-masked-view/masked-view react-native-big-list @react-native-async-storage/async-storage react-native-svg react-content-loader`

.
.
.

# Add custom fonts to projects

Create a file in root folder called **react-native.config.js**

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./app/assets/fonts'],
};
```

`npx react-native-asset`

`npx pod-install ios`

.
.
.

# Other libraries to use

`npx install-expo-modules`

`yarn add react-native-gifted-charts`

`yarn add react-native-mask-input`

`yarn add react-native-vision-camera`

`yarn add react-native-notifications`

`yarn add react-native-image-viewing`

`yarn add react-native-animatable`

`yarn add react-native-sectioned-multi-select`

`yarn add react-native-device-info`

`yarn add @react-native-community/geolocation`

`yarn add react-native-signature-canvas react-native-webview`
