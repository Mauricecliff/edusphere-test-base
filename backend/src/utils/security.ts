import {
  KeyObject,
  createPrivateKey,
  createSecretKey,
  createSign,
  generateKey,
  generateKeyPair,
  getHashes,
  randomBytes,
  sign,
  createHash,
  createVerify,
} from 'crypto';
import { config } from 'dotenv';
config();
export const getPrivateKey = async function () {
  let prom: Promise<KeyObject> = new Promise((res, rej) => {
    let PRIVATE_KEY = process.env.PRIVATE_KEY;
    if (!PRIVATE_KEY) {
      generateKeyPair(
        'ec',
        { namedCurve: 'secp384r1' },
        (err, pubKey, privKey) => {
          try {
            if (err) return rej(err);
            let keyAsPEM = privKey.export({
              type: 'pkcs8',
              format: 'der',
            });
            console.log(keyAsPEM.toString('hex'));
            res(privKey);
          } catch (error) {
            console.log(error);
            rej(error);
          }
        },
      );
    } else {
      let ss = createPrivateKey({
        type: 'pkcs8',
        format: 'der',
        key: Buffer.from(PRIVATE_KEY, 'hex'),
      });
      res(ss);
    }
  });

  return prom;
};

export const generateSecretKey = async () => {
  let prom: Promise<Buffer> = new Promise(async (res, rej) => {
    let PRIVATE_KEY: KeyObject;
    try {
      PRIVATE_KEY = await getPrivateKey();
    } catch (error) {
      console.log('iiiiiiiii');
      rej(error);
    }

    let rnd = randomBytes(30);
    //console.log(PRIVATE_KEY);
    let hash = createHash('sha256');
    let hashOfRnd = hash.update(rnd).digest();
    try {
      let createdSign = createSign('SHA256');
      createdSign.write(hashOfRnd);
      createdSign.end();
      let signature = createdSign.sign(PRIVATE_KEY);
      console.log(hashOfRnd.toString('base64url'));
      console.log(signature.toString('base64url'));
      res(signature);
    } catch (error) {
      console.log({ error });
    }
  });
  return prom;
};

export const verifyAPIKey = async (apiKey: string) => {
  let PRIVATE_KEY = await getPrivateKey();
  let hashValue = createHash('sha256').update(apiKey, 'base64url').digest();
  let verify = createVerify('SHA256');
  let asss = '';
  let sig = '';
  verify.update(hashValue);
  verify.verify(PRIVATE_KEY, sig);
};
