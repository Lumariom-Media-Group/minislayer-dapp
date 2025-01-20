
export const USDV="0xB6434db1Ff5549Cb8be98156bC65a7743084AA97";
export const USDV_DECIMALS=6;
export const MINI_SLAYER ="0xDCDdFB1CE9784B2Ab1Ef51AA3524A37398B41C71";
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