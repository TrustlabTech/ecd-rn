/**
 * Early Childhood Development App
 * @copyright 2016 Global Consent Ltd
 * Civvals, 50 Seymour Street, London, England, W1H 7JG
 * @author Alberto Dallaporta <alberto.dallaporta@novalab.io>
 */

package foundation.ixo.amply.ecd.reactnative.crypto;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import org.spongycastle.util.encoders.Base64;
import org.spongycastle.util.encoders.Hex;

import java.security.KeyStoreException;

public class ReactNativeEthereumCrypto extends ReactContextBaseJavaModule {
    private final static String TAG = "EthereumCrypto";
    private final static String SP_FILE = "staff.keystore";

    // Errors
    private final static byte E_KEYSTORE = 82;

    // Instance properties
    private SharedPreferences sharedPreferences = null;

    public ReactNativeEthereumCrypto(ReactApplicationContext reactContext) {
        super(reactContext);
        sharedPreferences = reactContext.getSharedPreferences(SP_FILE, Context.MODE_PRIVATE);
    }

    @Override
    public String getName() {
        return "EthereumCrypto";
    }

    /*************************************************************************
     *************************************************************************
     * KEYSTORE
     *************************************************************************
     *************************************************************************/

    /**
     * Check if the currently loaded store contains a key with the given alias
     * @param alias The alias of the key
     */
    @ReactMethod
    public void hasKey(String alias, Promise promise) {
        boolean found = sharedPreferences.contains("private" + alias) && sharedPreferences.contains("public" + alias);
        promise.resolve(found);
    }

    /**
     * Delete an key entry from the currently loaded keystore
     * @param alias The alias of the key entry
     */
    @ReactMethod
    public void deleteKey(String alias, Promise promise) {
        SharedPreferences.Editor editor = sharedPreferences.edit();

        editor.remove("private" + alias);
        editor.remove("public" + alias);

        editor.apply();
        promise.resolve(alias);
    }

    /*************************************************************************
     *************************************************************************
     * CRYPTO
     *************************************************************************
     *************************************************************************/

    @ReactMethod
    public void createECKeypair(boolean store, String keyAlias, Promise promise) {

        ECKey keypair = new ECKey();
        WritableMap ret = Arguments.createMap();

        ret.putString("privkey", Hex.toHexString(keypair.getPrivKey().toByteArray()));
        ret.putString("pubkey", Hex.toHexString(keypair.getPubKey()));
        ret.putString("address", Hex.toHexString(keypair.getAddress()));

        if (store) {
            if (storeKeyStore(keypair.getPrivKeyBytes(), keypair.getPubKey(), keyAlias))
                promise.resolve(ret);
            else
                promise.reject(Byte.toString(E_KEYSTORE), "Could not store keypair in keystore");
        } else
            promise.resolve(ret);
    }

    @ReactMethod
    public void sign(String message, String keyAlias, Promise promise) {
        try {
            String privateKeyAlias = "private" + keyAlias;

            if (!sharedPreferences.contains(privateKeyAlias))
                throw new KeyStoreException("Could not find a key with alias " + keyAlias + " in keystore");

            String privateKeyString = sharedPreferences.getString(privateKeyAlias, null);
            if (privateKeyString == null)
                throw new KeyStoreException("Could not find a key with alias " + keyAlias + " in keystore");

            ECKey keypair = ECKey.fromPrivate(Base64.decode(privateKeyString));
            ECKey.ECDSASignature signature = keypair.sign(SHA3Helper.sha3(Base64.decode(message)));

            promise.resolve(signature.toBase64());
        } catch (Exception e) {
            promise.reject(Byte.toString(E_KEYSTORE), e.getMessage());
        }
    }

    @ReactMethod
    public void verify(String keyAlias, String message, String signature, Promise promise) {
        try {
            String privateKeyAlias = "private" + keyAlias;

            String privateKeyString = sharedPreferences.getString(privateKeyAlias, null);
            if (privateKeyString == null)
                throw new KeyStoreException("Could not find a key with alias \"staff\" in keystore");

            ECKey keypair = ECKey.fromPrivate(Base64.decode(privateKeyString));
            boolean valid = ECKey.verify(Base64.decode(message), Base64.decode(signature), keypair.getPubKey());

            promise.resolve(valid);
        } catch (KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e.getMessage());
        }
    }

    /*************************************************************************
     *************************************************************************
     * PRIVATE METHODS
     *************************************************************************
     *************************************************************************/

    private boolean storeKeyStore(byte[] privateKey, byte[] publicKey, String keyAlias) {
        try {
            String publicKeyAlias = "public" + keyAlias, privateKeyAlias = "private" + keyAlias;

            SharedPreferences.Editor editor = sharedPreferences.edit();

            if (sharedPreferences.contains(publicKeyAlias) || sharedPreferences.contains(privateKeyAlias))
                throw new KeyStoreException("A key with alias " + keyAlias + " already exists");

            editor.putString(privateKeyAlias, Base64.toBase64String(privateKey));
            editor.putString(publicKeyAlias, Base64.toBase64String(publicKey));

            editor.apply();

            return true;
        } catch (KeyStoreException e) {
            Log.e(TAG, e.getMessage());
            return false;
        }
    }
}
