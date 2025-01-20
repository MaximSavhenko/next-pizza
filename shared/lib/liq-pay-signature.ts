import crypto from 'crypto'

export function generateSignature(data: any) {
  const privateKey = process.env.LIQPAY_PRIVATE_KEY

  const signatureString = privateKey + data + privateKey
  return crypto.createHash('sha1').update(signatureString).digest('base64')
}
