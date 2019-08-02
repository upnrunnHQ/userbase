import DH from 'diffie-hellman'
import { hexStringToArrayBuffer } from './utils'

const PRIME = hexStringToArrayBuffer('aaf7658bdd624560a2e23bf2a3248e4de82c1224b116984198c9f825d6021b40907ddd7527c6b3b421b2d8ac0db50eeb4f468217471896eff572e3b7048a5f15bf996a0ba7899b1b9cf0ddbf2e81217ae5aaee3747100ba9895bfe339e53f724ada9eedfde73e5fd80951c92d44c1e8a4a38c7a3022ccc1056910e2876b802843573cde57f496e5ee437f97131e4901154dd801e4b8e1a77e2553b19b6c625faf585c382698d5362b7ade019fcbb98126eba5629af5d0bac4ee64718e33a4d842a1d2c0711d2e0a7962fd9b9275f5b0a7fa5f4be0c098282f1e1ff8f471e33e074ed789b6596101c0089a0bb2a4cc047267248483944c308e085de721b0efcfb')
const GENERATOR = [2]

const SERVER_PUBLIC_KEY = hexStringToArrayBuffer('928d47c374679d8c5350209c1568fb1a7064b050dee544965e07971d0c48b9109cccb293606debc39f2260967fdba8eb1770f59d0f6e1a18324adc4fbbf67158966eb44421535ae6d43d364269501b37dad03f05f8d42698b994843d872bd8773cbf709d94ca60be13e2971c66183dcb18a2c3b01f383fd1b60f6ae369ee2ffe08389836bdaf3ced8ae174f7d1b4d1a935cc3f60349d4821ffc7a8b40a6265cc44bd543f08006c6cf7acd8821bae2d45150cc13e2ed7e308d9be92981bee7136e6714b59ef7c464f10fd2adce564ad432240e62da2bed66ded6b0e9a44cc424939c8b36beb92aafb8365aa3d1d7c3f9d4db6a646c4f371e4a4fcc306b080b6b3')

const setPrivateKeyAndGenerateKeys = (diffieHellman, privateKey) => {
  diffieHellman.setPrivateKey(privateKey)
  diffieHellman.generateKeys()
  return diffieHellman
}

const createDiffieHellman = (privateKey) => {
  const diffieHellman = DH.createDiffieHellman(PRIME, GENERATOR)
  return setPrivateKeyAndGenerateKeys(diffieHellman, privateKey)
}

const getPublicKeyAndSharedSecret = (privateKey, otherPublicKey) => {
  const diffieHellman = createDiffieHellman(privateKey)
  const publicKey = diffieHellman.getPublicKey()
  const sharedSecret = diffieHellman.computeSecret(otherPublicKey)
  return { publicKey, sharedSecret }
}

const getSharedSecret = (privateKey, otherPublicKey) => {
  const diffieHellman = createDiffieHellman(privateKey)
  return diffieHellman.computeSecret(otherPublicKey)
}

const getPublicKey = (privateKey) => {
  const diffieHellman = createDiffieHellman(privateKey)
  return diffieHellman.getPublicKey()
}

const getPublicKeyAndSharedSecretWithServer = (privateKey) => {
  return getPublicKeyAndSharedSecret(privateKey, SERVER_PUBLIC_KEY)
}

export default {
  getPublicKey,
  getSharedSecret,
  getPublicKeyAndSharedSecret,
  getPublicKeyAndSharedSecretWithServer,
}
