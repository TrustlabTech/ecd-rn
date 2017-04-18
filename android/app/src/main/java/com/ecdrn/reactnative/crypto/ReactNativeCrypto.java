package com.ecdrn.reactnative.crypto;

import java.security.*;
import java.security.cert.CertificateFactory;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;

import java.io.*;
import java.security.spec.ECGenParameterSpec;
import java.util.*;
import java.nio.charset.StandardCharsets;

import android.util.Log;
import android.util.Base64;
import android.content.Context;
import android.content.res.AssetManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.Arguments;

import org.spongycastle.jce.provider.BouncyCastleProvider;

public class ReactNativeCrypto extends ReactContextBaseJavaModule {

    // Errors
    private final static byte E_INVALID_EC_GEN_SPEC = 80;
    private final static byte E_NO_SUCH_ALGORITHM = 81;
    private final static byte E_KEYSTORE = 82;
    private final static byte E_CERTIFICATE = 83;
    private final static byte E_UNRECOVERABLE_KEY = 84;
    private final static byte E_SIGNATURE = 85;
    private final static byte E_INVALID_KEY = 86;
    private final static byte E_IO = 91;
    private final static byte E_FILE_NOT_FOUND = 92;


    // Asymmetric key types
    private final static String KEYPAIR_DH = "DH";
    private final static String KEYPAIR_DSA ="DSA";
    private final static String KEYPAIR_EC = "EC";
    private final static String KEYPAIR_RSA = "RSA";

    // Symmetric key types
    private final static String KEY_AES = "AES";
    private final static String KEY_AESWRAP = "AESWRAP";
    private final static String KEY_ARC4 = "ARC4";
    private final static String KEY_BLOWFISH = "Blowfish";
    private final static String KEY_DES = "DES";
    private final static String KEY_DESEDE = "DESede";
    private final static String KEY_DESEDEWRAP = "DESedeWRAP";
    private final static String KEY_HMACMD5 = "HmacMD5";
    private final static String KEY_HMACSHA1 = "HmacSHA1";
    private final static String KEY_HMACSHA224 = "HmacSHA224";
    private final static String KEY_HMACSHA256 = "HmacSHA256";
    private final static String KEY_HMACSHA384 = "HmacSHA384";
    private final static String KEY_HMACSHA512 = "HmacSHA512";
    private final static String KEY_RC4 = "RC4";

    // Signature algorithms
    private final static String SIG_DSA = "DSA";
    private final static String SIG_DSA_WITH_SHA1 = "DSAwithSHA1";
    private final static String SIG_DSS = "DSS";
    private final static String SIG_ECDSA = "ECDSA";
    private final static String SIG_ECDSA_WITH_SHA1 = "ECDSAwithSHA1";
    private final static String SIG_MD2_WITH_RSA = "MD2withRSA";
    private final static String SIG_MD4_WITH_RSA = "MD4withRSA";
    private final static String SIG_MD5_WITH_RSA = "MD5withRSA";
    private final static String SIG_MD5_WITH_RSA_ISO9796_2 = "MD5withRSA/ISO9796-2";
    private final static String SIG_NONE_WITH_DSA = "NONEwithDSA";
    private final static String SIG_NONE_WITH_ECDSA = "NONEwithECDSA";
    private final static String SIG_NONE_WITH_RSA = "NONEwithRSA";
    private final static String SIG_RSASSA_PSS = "RSASSA-PSS";
    private final static String SIG_SHA1_WITH_DSA = "SHA1withDSA";
    private final static String SIG_SHA1_WITH_ECDSA = "SHA1withECDSA";
    private final static String SIG_SHA1_WITH_RSA = "SHA1withRSA";
    private final static String SIG_SHA1_WITH_RSA_ISO9796_2 = "SHA1withRSA/ISO9796-2";
    private final static String SIG_SHA256_WITH_ECDSA = "SHA256withECDSA";
    private final static String SIG_SHA256_WITH_RSA = "SHA256withRSA";
    private final static String SIG_SHA384_WITH_ECDSA = "SHA384withECDSA";
    private final static String SIG_SHA384_WITH_RSA = "SHA384withRSA";
    private final static String SIG_SHA512_WITH_ECDSA = "SHA512withECDSA";
    private final static String SIG_SHA512_WITH_RSA = "SHA512withRSA";

    // Digest algorithms
    private final static String DIGEST_MD5 = "MD5";
    private final static String DIGEST_SHA_1 = "SHA-1";
    private final static String DIGEST_SHA_224 = "SHA-224";
    private final static String DIGEST_SHA_256 = "SHA-256";
    private final static String DIGEST_SHA_384 = "SHA-384";
    private final static String DIGEST_SHA_512 = "SHA-512";

    // Keystore types
    private final static String STORE_ANDROID_CA_STORE = "AndroidCAStore";
    private final static String STORE_ANDROID_KEY_STORE = "AndroidKeyStore";
    private final static String STORE_BCPKCS12 = "BCPKCS12";
    private final static String STORE_BKS = "BKS";
    private final static String STORE_BOUNCY_CASTLE = "BouncyCastle";
    private final static String STORE_PKCS12 = "PKCS12";
    private final static String STORE_PKCS12_DEF = "PKCS12_DEF";

    // Constants
    private final static String LOGTAG = "RNKEYSTORE";
    private final static boolean DEBUG = true;
    private static int RANDOM_SEED_SIZE = 64;

    // Instance properties
    private KeyStore keyStore = null;
    private String keyStoreType = null;
    private String alias = null;
    private Context context = null;
    private FileOutputStream loadedStoreFOS = null;

    public ReactNativeCrypto(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        this.keyStoreType = KeyStore.getDefaultType(); // default
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        // Errors
        constants.put("E_NO_SUCH_ALGORITHM", E_NO_SUCH_ALGORITHM);
        constants.put("E_KEYSTORE", E_KEYSTORE);
        constants.put("E_IO", E_IO);

        // Keystore types
        constants.put("STORE_ANDROID_CA_STORE", STORE_ANDROID_CA_STORE);
        constants.put("STORE_ANDROID_KEY_STORE", STORE_ANDROID_KEY_STORE);
        constants.put("STORE_BCPKCS12", STORE_BCPKCS12);
        constants.put("STORE_BKS", STORE_BKS);
        constants.put("STORE_BOUNCY_CASTLE", STORE_BOUNCY_CASTLE);
        constants.put("STORE_PKCS12", STORE_PKCS12);
        constants.put("STORE_PKCS12_DEF", STORE_PKCS12_DEF);

        // Asymmetric keys
        constants.put("KEYPAIR_DH", KEYPAIR_DH);
        constants.put("KEYPAIR_DSA", KEYPAIR_DSA);
        constants.put("KEYPAIR_EC", KEYPAIR_EC);
        constants.put("KEYPAIR_RSA", KEYPAIR_RSA);

        // Symmetric keys
        constants.put("KEY_AES", KEY_AES);
        constants.put("KEY_AESWRAP", KEY_AESWRAP);
        constants.put("KEY_ARC4", KEY_ARC4);
        constants.put("KEY_BLOWFISH", KEY_BLOWFISH);
        constants.put("KEY_DES", KEY_DES);
        constants.put("KEY_DESEDE", KEY_DESEDE);
        constants.put("KEY_DESEDEWRAP", KEY_DESEDEWRAP);
        constants.put("KEY_HMACMD5", KEY_HMACMD5);
        constants.put("KEY_HMACSHA1", KEY_HMACSHA1);
        constants.put("KEY_HMACSHA224", KEY_HMACSHA224);
        constants.put("KEY_HMACSHA256", KEY_HMACSHA256);
        constants.put("KEY_HMACSHA384", KEY_HMACSHA384);
        constants.put("KEY_HMACSHA512", KEY_HMACSHA512);

        constants.put("SIG_DSA", SIG_DSA);
        constants.put("SIG_DSA_WITH_SHA1", SIG_DSA_WITH_SHA1);
        constants.put("SIG_DSS", SIG_DSS);
        constants.put("SIG_ECDSA", SIG_ECDSA);
        constants.put("SIG_ECDSA_WITH_SHA1", SIG_ECDSA_WITH_SHA1);
        constants.put("SIG_MD2_WITH_RSA", SIG_MD2_WITH_RSA);
        constants.put("SIG_MD4_WITH_RSA", SIG_MD4_WITH_RSA);
        constants.put("SIG_MD5_WITH_RSA", SIG_MD5_WITH_RSA);
        constants.put("SIG_MD5_WITH_RSA_ISO9796_2", SIG_MD5_WITH_RSA_ISO9796_2);
        constants.put("SIG_NONE_WITH_DSA", SIG_NONE_WITH_DSA);
        constants.put("SIG_NONE_WITH_RSA", SIG_NONE_WITH_RSA);
        constants.put("SIG_NONE_WITH_ECDSA", SIG_NONE_WITH_ECDSA);
        constants.put("SIG_RSASSA_PSS", SIG_RSASSA_PSS);
        constants.put("SIG_SHA1_WITH_DSA", SIG_SHA1_WITH_DSA);
        constants.put("SIG_SHA1_WITH_ECDSA", SIG_SHA1_WITH_ECDSA);
        constants.put("SIG_SHA1_WITH_RSA", SIG_SHA1_WITH_RSA);
        constants.put("SIG_SHA1_WITH_RSA_ISO9796_2", SIG_SHA1_WITH_RSA_ISO9796_2);
        constants.put("SIG_SHA256_WITH_ECDSA", SIG_SHA256_WITH_ECDSA);
        constants.put("SIG_SHA256_WITH_RSA", SIG_SHA256_WITH_RSA);
        constants.put("SIG_SHA384_WITH_ECDSA", SIG_SHA384_WITH_ECDSA);
        constants.put("SIG_SHA384_WITH_RSA", SIG_SHA384_WITH_RSA);
        constants.put("SIG_SHA512_WITH_ECDSA", SIG_SHA512_WITH_ECDSA);
        constants.put("SIG_SHA512_WITH_RSA", SIG_SHA512_WITH_RSA);

        // Digest algorithms
        constants.put("DIGEST_MD5", DIGEST_MD5);
        constants.put("DIGEST_SHA_1", DIGEST_SHA_1);
        constants.put("DIGEST_SHA_224", DIGEST_SHA_224);
        constants.put("DIGEST_SHA_256", DIGEST_SHA_256);
        constants.put("DIGEST_SHA_384", DIGEST_SHA_384);
        constants.put("DIGEST_SHA_512", DIGEST_SHA_512);

        return constants;
    }

    public String getName() {
        return "Crypto";
    }

    /**
     * Get the alias of the currently loaded keystore
     */
    @ReactMethod
    public void getCurrentKeyStoreAlias(Promise promise) {
        try {
            if(this.keyStore == null || this.alias == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            promise.resolve(this.alias);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * List all files/folders in the given store path. Store
     * path is relative to app path
     * @param Relative directory to look in (/ for app root dir)
     * @param WritableNativeArray the files/folders in the directory
     */
    @ReactMethod
    public void getKeyStoreList(Promise promise) {
        try {
            File keyStoreFolder = this.getStoresFolder();
            File[] listOfFiles = keyStoreFolder.listFiles();
            WritableNativeArray names = new WritableNativeArray();
            for(int i = 0; i < listOfFiles.length; i++) {
                names.pushString(listOfFiles[i].getName());
                Log.d(LOGTAG, listOfFiles[i].getName());
            }
            promise.resolve(names);
        } catch(IOException e) {
            promise.reject(Byte.toString(E_IO), e);
        }
    }

    /**
     * Delete a store by filename
     * @param The name of the store to delete
     */
    @ReactMethod
    public void deleteKeyStore(String name, Promise promise) {
        try {
            File store = new File(this.absolutePath(name));
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
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            WritableNativeArray map = new WritableNativeArray();
            Enumeration<String> aliases = this.keyStore.aliases();
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
     * @param The alias of the key
     */
    @ReactMethod
    public void containsKeyAlias(String keyAlias, Promise promise) {
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            boolean found = this.keyStore.containsAlias(keyAlias);
            promise.resolve(found);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Delete an key entry from the currently loaded keystore
     * @param The alias of the key entry
     */
    @ReactMethod
    public void deleteKeyEntry(String keyAlias, Promise promise) {
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            this.keyStore.deleteEntry(keyAlias);
            // this.keyStore.store();
            promise.resolve(keyAlias);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Get a certificate from the currently loaded keystore by alias
     * @param The alias of the certificate
     * @return The certificate
     */
    @ReactMethod
    public void getKeyStoreCertificate(String certificateAlias, Promise promise) {
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            Certificate certificate = this.keyStore.getCertificate(certificateAlias);
            promise.resolve(certificate.toString());
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Get the number of keys in the currently loaded keystore
     * @return The number of keys
     */
    @ReactMethod
    public void keyStoreSize(Promise promise) {
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            int size = this.keyStore.size();
            promise.resolve(size);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        }
    }

    /**
     * Load a keystore from file
     * @param filename
     * @param password
     */
    @ReactMethod
    public void loadKeyStore(String name, String password, Promise promise) {

        char[] passwordCharacters = password.toCharArray();

        try (FileInputStream fis = new FileInputStream(this.absolutePath(name))) {
            if(this.keyStore == null) {
                this.init();
            }
            // this.loadedStoreFOS
            this.keyStore.load(fis, passwordCharacters);
            this.alias = name;
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
     * Create a digest of a string
     * @param dataString A string of data to be digested
     * @param algorithim The digest algorithm
     */
    @ReactMethod
    public void digest(String dataString, String algorithm, Promise promise) {
        try {
            byte[] data = dataString.getBytes(StandardCharsets.UTF_8);
            MessageDigest md = MessageDigest.getInstance(algorithm);
            byte[] hash = md.digest(data);
            String b64 = Base64.encodeToString(hash, Base64.NO_WRAP);
            promise.resolve(b64);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        }
    }

    /**
     * Sign a message with a key
     */
    @ReactMethod
    public void sign(String dataString, String privateKeyAlias, String privateKeyPassword, String algorithm, Promise promise) {
        // Sign with keys
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            PrivateKey privateKey = (PrivateKey)this.keyStore.getKey(privateKeyAlias, privateKeyPassword.toCharArray());
            Signature sig = Signature.getInstance(algorithm);
            sig.initSign(privateKey, this.newSecureRandom());
            byte[] data = dataString.getBytes(StandardCharsets.UTF_8);
            sig.update(data);
            byte[] signature = sig.sign();
            String sigB64 = Base64.encodeToString(signature, Base64.NO_WRAP);
            promise.resolve(sigB64);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        } catch(InvalidKeyException e) {
            promise.reject(Byte.toString(E_INVALID_KEY), e);
        } catch(SignatureException e) {
            promise.reject(Byte.toString(E_SIGNATURE), e);
        } catch(UnrecoverableKeyException e) {
            promise.reject(Byte.toString(E_UNRECOVERABLE_KEY), e);
        }
    }

    /**
     * Verify a message
     */
    @ReactMethod
    public void verify(String signature, String publicKeyAlias, String publicKeyPassword, String algorithm, Promise promise) {
        if(this.keyStore == null) {
            promise.reject(new KeyStoreException("Keystore must first be loaded"));
            return;
        }
        // Verify with keys
        try {
            PublicKey publicKey = (PublicKey)this.keyStore.getKey(publicKeyAlias, publicKeyPassword.toCharArray());
            Signature sig = Signature.getInstance(algorithm);
            sig.initVerify(publicKey);
            boolean result = sig.verify(this.hexToBytes(signature));
            promise.resolve(result);
        } catch(InvalidKeyException e) {
            promise.reject(Byte.toString(E_INVALID_KEY), e);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        } catch(SignatureException e) {
            promise.reject(Byte.toString(E_SIGNATURE), e);
        } catch(UnrecoverableKeyException e) {
            promise.reject(Byte.toString(E_UNRECOVERABLE_KEY), e);
        }
    }

    /**
     * Get a specified key formatted as a pem string
     * @param keyAlias The alias of the keypair
     * @param keyPassword The password for the key
     */
    @ReactMethod
    public void getKeyAsPem(String keyAlias, String keyPassword, Promise promise) throws NoSuchAlgorithmException, UnrecoverableKeyException {
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            Key key = (Key)this.keyStore.getKey(keyAlias, keyPassword.toCharArray());
            if(key == null) {
                throw new KeyStoreException("Key with alias " + keyAlias + " does not exist");
            }
            // We need to know if key is priv or public for correct pem format
            String pemFormatted = "-----BEGIN PUBLIC KEY-----\n" + Base64.encodeToString(key.getEncoded(), Base64.DEFAULT) + "-----END PUBLIC KEY-----";
            promise.resolve(pemFormatted);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        } catch(UnrecoverableKeyException e) {
            promise.reject(Byte.toString(E_UNRECOVERABLE_KEY), e);
        }
    }

    @ReactMethod
    public void getKeyAsHex(String keyAlias, String keyPassword, Promise promise) {
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            Key key = (Key)this.keyStore.getKey(keyAlias, keyPassword.toCharArray());
            promise.resolve(ReactNativeCrypto.bytesToHex(key.getEncoded()));
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        } catch(UnrecoverableKeyException e) {
            promise.reject(Byte.toString(E_UNRECOVERABLE_KEY), e);
        }
    }

    /**
     * Generate a new keypair and save it to the currently loaded store
     * @param type The byte type of an algorithm
     * @param keyAlias The alias of the keypair
     * @param password The password used to create they keypair
     * @param certificateFilename The filename/path of the X509 certificate the key is signed with
     * @param promise com.facebook.react.bridge.Promise;
     * @return void
     * @throws IOException
     */
    @ReactMethod
    public void addKeyPair(String type, String keyAlias, String spec, String password, String certificateFilename, Promise promise) {

        FileOutputStream fos = null;
        try {
            if(this.keyStore == null) {
                throw new KeyStoreException("Keystore must first be loaded");
            }
            // Check if already exists
            Enumeration<String> aliases = this.keyStore.aliases();
            while(aliases.hasMoreElements()) {
                String alias = aliases.nextElement();

                if(alias.equals(keyAlias) || alias.equals("private"+keyAlias) || alias.equals("public"+keyAlias)) {
                    throw new KeyStoreException("A key with that alias already exists");
                }
            }

            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(type, new BouncyCastleProvider());
            ECGenParameterSpec ecGenParameterSpec = new ECGenParameterSpec(spec);

            try {
                keyPairGenerator.initialize(ecGenParameterSpec, this.newSecureRandom());
            } catch (InvalidAlgorithmParameterException e) {
                promise.reject(e.getMessage());
                return;
            }

            // Create a keypair
            KeyPair keyPair = keyPairGenerator.generateKeyPair();
            PrivateKey privateKey = keyPair.getPrivate();
            String privateKeyB64 = Base64.encodeToString(privateKey.getEncoded(), Base64.DEFAULT);
            PublicKey publicKey = keyPair.getPublic();
            String publicKeyB64 = Base64.encodeToString(publicKey.getEncoded(), Base64.DEFAULT);

            WritableMap map = Arguments.createMap();
            map.putString("privateKey", privateKeyB64);
            map.putString("publicKey", publicKeyB64);

            // Convert password to char array
            char[] passwordCharacters = password.toCharArray();

            // Load certificate
            Certificate x509Cert = this.loadCertificate(certificateFilename);
            Certificate[] certChain = new Certificate[1];
            certChain[0] = x509Cert;

            // Set entries
            this.keyStore.setKeyEntry("public" + keyAlias, publicKey, passwordCharacters, certChain);
            this.keyStore.setKeyEntry("private" + keyAlias, privateKey, passwordCharacters, certChain);

            // Write to file
            fos = new FileOutputStream(this.absolutePath(this.alias));
            this.keyStore.store(fos, passwordCharacters);

            promise.resolve(map);
        }

        catch(IOException e) {
            promise.reject(Byte.toString(E_IO), e);
        } catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        } catch (CertificateException e) {
            promise.reject(Byte.toString(E_CERTIFICATE), e);
        } catch(KeyStoreException e) {
            promise.reject(Byte.toString(E_KEYSTORE), e);
        } finally {
            try {
                if(fos != null) {
                    fos.close();
                }
            } catch(IOException e) {
                promise.reject(Byte.toString(E_IO), e);
            }
        }
    }

    /**
     * Generate a new keypair without saving it to the currently loaded store
     * @param type The byte type of an algorithm
     * @param keyAlias The alias of the keypair
     * @param password The password used to create they keypair
     * @param certificateFilename The filename/path of the X509 certificate the key is signed with
     * @param promise com.facebook.react.bridge.Promise;
     * @return void
     * @throws NoSuchElementException
     * @throws InvalidAlgorithmParameterException
     */
    @ReactMethod
    public void createECKeyPair(String type, String spec, Promise promise) {

        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(type, new BouncyCastleProvider());
            ECGenParameterSpec ecGenParameterSpec = new ECGenParameterSpec(spec);

            keyPairGenerator.initialize(ecGenParameterSpec, this.newSecureRandom());

            // Create a keypair
            KeyPair keyPair = keyPairGenerator.generateKeyPair();
            PrivateKey privateKey = keyPair.getPrivate();
            String privateKeyB64 = Base64.encodeToString(privateKey.getEncoded(), Base64.DEFAULT);
            PublicKey publicKey = keyPair.getPublic();
            String publicKeyB64 = Base64.encodeToString(publicKey.getEncoded(), Base64.DEFAULT);

            WritableMap map = Arguments.createMap();
            map.putString("privateKey", privateKeyB64);
            map.putString("publicKey", publicKeyB64);

            promise.resolve(map);
        }
        catch(NoSuchAlgorithmException e) {
            promise.reject(Byte.toString(E_NO_SUCH_ALGORITHM), e);
        }
        catch (InvalidAlgorithmParameterException e) {
            promise.reject(Byte.toString(E_INVALID_EC_GEN_SPEC), e);
        }
    }

    // Private Methods

    /**
     * Create a new random seed
     * @return A new seeded SecureRandom
     */
    private SecureRandom newSecureRandom() {
        SecureRandom random = new SecureRandom();
        byte[] seed = random.generateSeed(RANDOM_SEED_SIZE);
        random.setSeed(seed);
        return random;
    }

    /**
     * Get the absolute path of a relative path
     * @param name The name of the keystore
     * @return The absolute path of the keystore file
     */
    private String absolutePath(String name) throws IOException {
        return this.getStoresFolder().getPath() + "/" + name;
    }

    /**
     * Convert an array of bytes to a string of hex
     * @param An array of bytes
     * @return A string of hex
     * http://stackoverflow.com/questions/9655181/how-to-convert-a-byte-array-to-a-hex-string-in-java/9855338#9855338
     */
    private static String bytesToHex(byte[] bytes) {
        final char[] hexArray = {'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};
        char[] hexChars = new char[bytes.length * 2];
        int v;
        for ( int j = 0; j < bytes.length; j++ ) {
            v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    /**
     * Convert a string of hex to an array of bytes
     * @param The string of hex to be converted
     * @returns The bytes representing the string
     * http://stackoverflow.com/questions/140131/convert-a-string-representation-of-a-hex-dump-to-a-byte-array-using-java/140861#140861
     */
    private static byte[] hexToBytes(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
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

    /**
     * Initialise the keystore
     */
    private void init() throws KeyStoreException, IOException {
        this.keyStoreType = KeyStore.getDefaultType();
        this.keyStore = KeyStore.getInstance(this.keyStoreType);
    }

    /**
     * Returns a file object representing the stores folder
     * @return File - The folder containing the stores
     */
    private File getStoresFolder() throws IOException {
        // init abstract folder
        File storesDirectory = new File(this.context.getFilesDir().getPath() + "/stores");
        // create if not exists
        if(!storesDirectory.exists()) {
            if(!storesDirectory.mkdir()) {
                throw new IOException("Could not create directory " + storesDirectory.getPath());
            }
        }
        return storesDirectory;
    }
}