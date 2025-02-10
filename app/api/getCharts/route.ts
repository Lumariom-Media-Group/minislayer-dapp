import postgres from 'postgres';
import { NextResponse } from 'next/server';
import { http,fallback } from '@wagmi/core'

import {

    polygon,

} from 'wagmi/chains';
import { createPublicClient, formatUnits } from 'viem';
import {getBlock} from "viem/actions";
import { MINI_SLAYER_DECIMALS } from '@/constants';


export async function GET() {
  // Initialize the connection to the PostgreSQL database

  const publicClient =   createPublicClient({
    transport:fallback([http("https://polygon.llamarpc.com",{
        batch:{
            batchSize: 25,
            wait:16,
        },
        
    }),http("https://polygon.rpc.subquery.network/public",{
        batch:{
            batchSize: 50,
            wait:16,
        },
    })]),
    chain: polygon,
  })

  
 

  const sql = postgres(process.env.DATABASE_URL as string);

  try {
    // Execute the query
    const result = await sql`
      SELECT price_to_set, block_number, tx_index, 'mint' AS event_type
    FROM minislayertracker_mini_slayer_live_final.mint_event

    UNION ALL

    SELECT price_to_set, block_number, tx_index, 'redeem' AS event_type
    FROM minislayertracker_mini_slayer_live_final.redeem_event

    ORDER BY block_number ASC, tx_index ASC;

    `;

    const allBlockNumbers = result.map((chartData)=>BigInt(chartData.block_number)) as bigint[];

    const allBlockData = await Promise.all(
        allBlockNumbers.map((blockNumber)=>  getBlock(publicClient,{blockNumber:blockNumber}))
    )

    

    const allBlockWithTimeStamp = allBlockData.map((blockData)=> {
        return {
            "block_number":blockData.number,
            "timestamp":blockData.timestamp,
        }
    })


    const enrichedResult = result.map(event => {
        const matchingBlock = allBlockWithTimeStamp.find(block => block.block_number === BigInt(event.block_number));
        
        return {
            
            "price":formatUnits(event.price_to_set,MINI_SLAYER_DECIMALS),
            "timestamp": matchingBlock ? matchingBlock.timestamp.toString() : null // Add timestamp if found, otherwise null
        };
    });
    

    

    const hardcodedChartData = {
      "timestamp":"1738340381",
      "price":"1",
    }
    enrichedResult.unshift(hardcodedChartData);
    

    // Return the result as JSON
    return NextResponse.json(enrichedResult);
  } catch (error) {
    console.log(error)
   
    // Handle errors (e.g., connection issues or query errors)
    
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
