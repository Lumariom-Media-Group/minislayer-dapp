
export const USDV="0xdAc9856128C93931F4cbdffEcfA1B5cA801AE16F";
export const USDV_DECIMALS=6;
export const MINI_SLAYER ="0x605097BC2a9ff3322a2F4daF66d48df7d1504DB4";
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