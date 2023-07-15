import { IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
// import { PublicKey } from '@solana/web3.js'
/*
function IsSolanaAddress(address:string){
  try {
    let pubkey = new PublicKey(address)
    let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
    return isSolana
  } catch (error) {
    return false
  }
export class AuthDto {
  // @IsEthereumAddress()
  @IsSolanaAddress()
  @IsNotEmpty()
  wallet: string
}
*/

// function IsSolanaAddress(): PropertyDecorator {
//   return
// }

export class AuthDto {
  // @IsSolanaAddress()
  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(32)
  @MaxLength(44)
  wallet: string
}
