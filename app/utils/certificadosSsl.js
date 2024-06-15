import { generate } from 'selfsigned';
import { writeFileSync } from 'fs';
import {generateKeyPairSync} from "node:crypto"

// Extraer la clave privada de las variables de entorno
const { __PRIVATE_KEY } = process.env;

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: __PRIVATE_KEY
    }
  });

// Opciones para la generación del certificado
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = generate(attrs, {
  keySize: 2048, // Tamaño de la clave
  days: 365, // Validez del certificado en días
  algorithm: 'sha256', // Algoritmo de hash
  extensions: [{ name: 'basicConstraints', cA: true }], // Extensiones necesarias
  privateKey: privateKey // Utilizar la clave privada del .env si está disponible
});

// Escribir la clave privada y el certificado en archivos
writeFileSync('claveprivada.pem', pems.private);
writeFileSync('certificado.pem', pems.cert);

console.log('Clave privada y certificado creados.');
