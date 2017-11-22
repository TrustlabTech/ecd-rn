#!/usr/bin/env bash
if [[ "$(git rev-parse --abbrev-ref HEAD)" == "unstable" ]]; then
    cp -R cfg/dev.json cfg/runtime.json
else
    cp -R cfg/prod.json cfg/runtime.json
fi

sed -i "s|<ECD_APP_FABRIC_KEY>|$ECD_APP_FABRIC_KEY|" android/app/src/main/AndroidManifest.xml
sed -i "s|<CODEPUSH_AMPLYECD_PRODUCTION>|$CODEPUSH_AMPLYECD_PRODUCTION|" android/app/build.gradle
sed -i "s|<CODEPUSH_AMPLYECD_STAGING>|$CODEPUSH_AMPLYECD_STAGING|" android/app/build.gradle
# EOF
