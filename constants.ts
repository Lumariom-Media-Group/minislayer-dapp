
export const USDV="0xdAc9856128C93931F4cbdffEcfA1B5cA801AE16F";
export const USDV_DECIMALS=6;
export const MINI_SLAYER ="0x446B991F252C1a39c428e2C6BeE590Fd69C8f947";
export const MINI_SLAYER_DECIMALS=6;
export function getMintAndRedeemPrice(level:number){
    return {mintPrice:level,redeemPrice:level-1};
}

function calculator(
    level : number
    
){

    const tokenMintable = 10;

    const {mintPrice,redeemPrice} = getMintAndRedeemPrice(level);

}