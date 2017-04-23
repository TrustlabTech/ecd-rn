package com.ecdrn.reactnative.crypto;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import org.spongycastle.util.encoders.Hex;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.util.Enumeration;

public class ReactNativeEthereumCrypto extends ReactContextBaseJavaModule {
    private final static String TAG = "EthereumCrypto";

    // Errors
    private final static byte E_NO_SUCH_ALGORITHM = 81;
    private final static byte E_KEYSTORE = 82;
    private final static byte E_CERTIFICATE = 83;
    private final static byte E_IO = 91;
    private final static byte E_FILE_NOT_FOUND = 92;

    private final static String STORE_BOUNCY_CASTLE = "BouncyCastle";

    // Instance properties
    private KeyStore keyStore = null;
    private String keyStoreType = null;
    private String alias = null;
    private Context context = null;

    public ReactNativeEthereumCrypto(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        keyStoreType = KeyStore.getDefaultType();
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
     * Create a new keystore in the application directory
     * @param name The name of the keystore
     * @param password The password to lock/unlock the keystore
     * @return True on success
     */
    @ReactMethod
    public void createKeyStore(String name, String password, Promise promise) throws IOException {

        String filePath = this.absolutePath(name);
        File keyStoreAbstract = new File(filePath);
        if(keyStoreAbstract.exists()) {
            promise.reject(new IOException("Keystore with name " + name + " already exists"));
            return;
        }


        FileOutputStream fos = null;
        char[] passwordCharacters = password.toCharArray();
        try {
            if(this.keyStore == null) {
                this.init();
            }
            fos = new FileOutputStream(filePath);
            this.keyStore.load(null, passwordCharacters);
            this.keyStore.store(fos, passwordCharacters);
            this.alias = name;
            promise.resolve(true);
        } catch(IOException e) {
            promise.reject(Byte.toString(E_IO), e);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        } catch(CertificateException e) {
            promise.reject(Byte.toString(E_CERTIFICATE), e);
        } finally {
            if(fos != null) {
                try {
                    fos.close();
                } catch(IOException e) {
                    promise.reject(Byte.toString(E_KEYSTORE), e);
                }
            }
        }
    }

    /**
     * Get the alias of the currently loaded keystore
     */
    @ReactMethod
    public void getCurrentKeyStoreAlias(Promise promise) {
        try {
            if(keyStore == null || alias == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            promise.resolve(alias);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * List all files/folders in the given store path. Store
     * path is relative to app path
     */
    @ReactMethod
    public void getKeyStoreList(Promise promise) {
        try {
            File keyStoreFolder = getStoresFolder();
            File[] listOfFiles = keyStoreFolder.listFiles();
            WritableNativeArray names = new WritableNativeArray();
            for(int i = 0; i < listOfFiles.length; i++) {
                names.pushString(listOfFiles[i].getName());
                Log.d(TAG, listOfFiles[i].getName());
            }
            promise.resolve(names);
        } catch(IOException e) {
            promise.reject(Byte.toString(E_IO), e);
        }
    }

    /**
     * Delete a store by filename
     * @param name The name of the store to delete
     */
    @ReactMethod
    public void deleteKeyStore(String name, Promise promise) {
        try {
            File store = new File(absolutePath(name));
            store.delete();
            promise.resolve(null);
        } catch(SecurityException e) { // fixme
            promise.reject(e);
        } catch(IOException e) {
            promise.reject(Byte.toString(E_IO), e);
        }
    }

    /**
     * Get all the key aliases from the currently loaded keystore
     */
    @ReactMethod
    public void getKeyAliases(Promise promise) {
        try {
            if(keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            WritableNativeArray map = new WritableNativeArray();
            Enumeration<String> aliases = keyStore.aliases();
            while (aliases.hasMoreElements()) {
                map.pushString(aliases.nextElement());
            }
            promise.resolve(map);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Check if the currently loaded store contains a key with the given alias
     * @param keyAlias The alias of the key
     */
    @ReactMethod
    public void containsKeyAlias(String keyAlias, Promise promise) {
        try {
            if(keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            boolean found = keyStore.containsAlias(keyAlias);
            promise.resolve(found);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Delete an key entry from the currently loaded keystore
     * @param keyAlias The alias of the key entry
     */
    @ReactMethod
    public void deleteKeyEntry(String keyAlias, Promise promise) {
        try {
            if(keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            keyStore.deleteEntry(keyAlias);
            // this.keyStore.store();
            promise.resolve(keyAlias);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Get a certificate from the currently loaded keystore by alias
     * @param certificateAlias - The alias of the certificate
     */
    @ReactMethod
    public void getKeyStoreCertificate(String certificateAlias, Promise promise) {
        try {
            if(keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            Certificate certificate = keyStore.getCertificate(certificateAlias);
            promise.resolve(certificate.toString());
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Get the number of keys in the currently loaded keystore
     */
    @ReactMethod
    public void keyStoreSize(Promise promise) {
        try {
            if(keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            int size = keyStore.size();
            promise.resolve(size);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Load a keystore from file
     * @param name
     * @param password
     */
    @ReactMethod
    public void loadKeyStore(String name, String password, Promise promise) {

        char[] passwordCharacters = password.toCharArray();

        try (FileInputStream fis = new FileInputStream(absolutePath(name))) {
            if(keyStore == null) {
                this.init();
            }
            // this.loadedStoreFOS
            keyStore.load(fis, passwordCharacters);
            alias = name;
            promise.resolve(name);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        } catch (FileNotFoundException e) {
            promise.reject(Byte.toString(E_FILE_NOT_FOUND), e);
        } catch (KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        } catch (CertificateException e) {
            promise.reject(Byte.toString(E_CERTIFICATE), e);
        } catch(IOException e) {
            promise.reject(Byte.toString(E_IO), e);
        }
    }

    /*************************************************************************
     *************************************************************************
     * CRYPTO
     *************************************************************************
     *************************************************************************/

    @ReactMethod
    public void createECKeypair(boolean store, String keyAlias, String password, String certificateFilename, Promise promise) {
        ECKey keypair = new ECKey();
        WritableMap ret = Arguments.createMap();

        ret.putString("privkey", Hex.toHexString(keypair.getPrivKey().toByteArray()));
        ret.putString("pubkey", Hex.toHexString(keypair.getPubKeyRaw().getEncoded(false)));
        ret.putString("address", Hex.toHexString(keypair.getAddress()));

        if (store) {
            if (storeKeyStore(keypair.getPubKey(), keypair.getPrivKeyBytes(), keyAlias, password, certificateFilename))
                promise.resolve(ret);
            else
                promise.reject(Byte.toString(E_KEYSTORE), "Could not store keypair in keystore");
        } else
            promise.resolve(ret);
    }

    /*************************************************************************
     *************************************************************************
     * PRIVATE METHODS
     *************************************************************************
     *************************************************************************/

    private boolean storeKeyStore(byte[] pubkey, byte[] privkey, String keyAlias, String password, String certificateFilename) {
        FileOutputStream fos = null;
        try {
            if (keyStore == null)
                throw new KeyStoreException("Keystore must first be loaded");

            // Check if already exists
            Enumeration<String> aliases = keyStore.aliases();
            while(aliases.hasMoreElements()) {
                String alias = aliases.nextElement();
                if (alias.equals(keyAlias) || alias.equals("private"+keyAlias) || alias.equals("public"+keyAlias))
                    throw new KeyStoreException("A key with alias " + keyAlias + " already exists");
            }

            // Load certificate
            Certificate x509Cert = loadCertificate(certificateFilename);
            Certificate[] certChain = new Certificate[1];
            certChain[0] = x509Cert;

            // set entries
            keyStore.setKeyEntry("public" + keyAlias, pubkey, certChain);
            keyStore.setKeyEntry("private" + keyAlias, privkey, certChain);

            char[] passwordChars = password.toCharArray();

            fos = new FileOutputStream(absolutePath(alias));
            keyStore.store(fos, passwordChars);
            fos.close();

            return true;

        } catch (KeyStoreException e) {
            Log.e(TAG, e.getMessage());
            return false;
        } catch (CertificateException e) {
            Log.e(TAG, e.getMessage());
            return false;
        } catch (IOException e) {
            Log.e(TAG, e.getMessage());
            return false;
        } catch (NoSuchAlgorithmException e) {
            Log.e(TAG, e.getMessage());
            return false;
        }
    }

    /**
     * Initialise the keystore
     */
    private void init() throws KeyStoreException, IOException {
        keyStoreType = KeyStore.getDefaultType();
        keyStore = KeyStore.getInstance(keyStoreType);
    }

    /**
     * Get the absolute path of a relative path
     * @param name The name of the keystore
     * @return The absolute path of the keystore file
     */
    private String absolutePath(String name) throws IOException {
        return getStoresFolder().getPath() + "/" + name;
    }

    /**
     * Returns a file object representing the stores folder
     * @return File - The folder containing the stores
     */
    private File getStoresFolder() throws IOException {
        // init abstract folder
        File storesDirectory = new File(context.getFilesDir().getPath() + "/stores");
        // create if not exists
        if(!storesDirectory.exists()) {
            if(!storesDirectory.mkdir()) {
                throw new IOException("Could not create directory " + storesDirectory.getPath());
            }
        }
        return storesDirectory;
    }

    /**
     * Load a certificate from the given location
     */
    private Certificate loadCertificate(String certificateFilename) throws IOException, CertificateException {
        AssetManager assetManager = context.getAssets();
        BufferedInputStream bis = new BufferedInputStream(assetManager.open(certificateFilename));
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        return cf.generateCertificate(bis);
    }
}
