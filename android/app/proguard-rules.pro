# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Disabling obfuscation is useful if you collect stack traces from production crashes
# (unless you are using a system that supports de-obfuscate the stack traces).
-dontobfuscate

# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.UIProp <fields>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

-dontwarn com.facebook.react.**

# okhttp

-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**
-dontwarn com.joshdholtz.sentry.*
-dontwarn org.apache.http.*
-dontwarn org.apache.http.client.*
-dontwarn org.apache.http.client.methods.*
-dontwarn org.apache.http.impl.cookie.*
-dontwarn org.apache.http.entity.*
-dontwarn org.apache.http.message.*
-dontwarn android.net.http.*
-dontwarn com.google.android.gms.internal.*

# spongycastle

-keep class org.spongycastle.asn1.** {*;}
-keep class org.spongycastle.math.ec.** {*;}
-keep class org.spongycastle.math.field.** {*;}
-keep class org.spongycastle.crypto.params.** {*;}
-keep class org.spongycastle.crypto.signers.** {*;}
-keep class org.spongycastle.crypto.generators.** {*;}

-keep class org.spongycastle.util.encoders.Hex
-keep class org.spongycastle.util.encoders.Base64

-keep class org.spongycastle.crypto.DSA
-keep class org.spongycastle.crypto.Mac
-keep class org.spongycastle.crypto.Digest
-keep class org.spongycastle.crypto.KeyEncoder
-keep class org.spongycastle.crypto.CipherParameters
-keep class org.spongycastle.crypto.DerivationParameters
-keep class org.spongycastle.crypto.AsymmetricBlockCipher
-keep class org.spongycastle.crypto.AsymmetricCipherKeyPair
-keep class org.spongycastle.crypto.KeyGenerationParameters
-keep class org.spongycastle.crypto.AsymmetricCipherKeyPairGenerator

-keep class org.spongycastle.crypto.digests.SHA3Digest
-keep class org.spongycastle.crypto.digests.SHA256Digest

-dontwarn javax.naming.**

# MISC

-dontwarn android.text.StaticLayout # https://github.com/facebook/react-native/issues/11891
