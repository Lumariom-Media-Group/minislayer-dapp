import postgres from 'postgres';
import { NextResponse } from 'next/server';
import { formatUnits } from 'viem';

function getLastMidnightUTC(): number {
  const now = new Date();
  const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return Math.floor(utcMidnight.getTime() / 1000);
}

async function getBlockNumberByTimestamp(timestamp: number) {

  const apiKey = process.env.ETHERSCAN_API_KEY

  const resp = await fetch("https://api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=" + timestamp + "&closest=before&apikey="+apiKey)
  const data = await resp.json()
  return data.result
}



export async function GET() {
  // Initialize the connection to the PostgreSQL database

  let midNightBlock = await getBlockNumberByTimestamp(getLastMidnightUTC())

  if(midNightBlock < 67379292){
    midNightBlock = 67379292
  }

 

  const sql = postgres(process.env.DATABASE_URL as string);

  try {
    // Execute the query
    const result = await sql`
      SELECT 'total_usdv' AS metric, COALESCE(SUM(CAST(usdv_entered AS DECIMAL)), 0) AS total_amount
      FROM minislayertracker_mini_slayer_live_final.mint_event
      WHERE block_number > 67379292
      UNION ALL
      SELECT 'total_redeem' AS metric, COALESCE(SUM(CAST(redeem_amount AS DECIMAL)), 0) AS total_amount
      FROM minislayertracker_mini_slayer_live_final.redeem_event
      WHERE block_number > 67379292;
    `;

    const result24Hour = await sql`
      SELECT 'total_usdv' AS metric,          COALESCE(SUM(CAST(usdv_entered AS DECIMAL)), 0) AS total_amount

      FROM minislayertracker_mini_slayer_live_final.mint_event
      WHERE block_number > ${midNightBlock}
      UNION ALL
      SELECT 'total_redeem' AS metric, COALESCE(SUM(CAST(redeem_amount AS DECIMAL)), 0) AS total_amount
      FROM minislayertracker_mini_slayer_live_final.redeem_event
      WHERE block_number > ${midNightBlock};
    `;

    await sql.end();

    // Return the result as JSON
    return NextResponse.json({
      "total_mint_volume": formatUnits(result[0].total_amount, 6),
      "total_redeem_volume": formatUnits(result[1].total_amount, 6),
      "total_volume": parseFloat(formatUnits(result[0].total_amount, 6)) + parseFloat(formatUnits(result[1].total_amount, 6)),
      "total_mint_volume_24h": formatUnits(result24Hour[0].total_amount, 6),
      "total_redeem_volume_24h": formatUnits(result24Hour[1].total_amount, 6),
      "total_volume_24h": parseFloat(formatUnits(result24Hour[0].total_amount, 6)) + parseFloat(formatUnits(result24Hour[1].total_amount, 6)),
    });
  } catch (error) {
    await sql.end();

   
    // Handle errors (e.g., connection issues or query errors)
    
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
