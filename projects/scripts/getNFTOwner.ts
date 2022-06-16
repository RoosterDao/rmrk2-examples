import { cryptoWaitReady } from "@polkadot/util-crypto";
import { getApi } from "./utils";
import {
  WS_URL,
} from "./constants";
import { Collection, NFT, fetchRemarks, getRemarksFromBlocks, Consolidator, getLatestFinalizedBlock } from "rmrk-tools";

const BLOCK_NUMBER  = 14;

export const getNFTOwner = async (
    chunkyBlock: number
  ) => {
    try {
      console.log("GETTING PROPERTIES OF CHUNKY NFT START -------");
      await cryptoWaitReady();
      const ws = WS_URL;
      const api = await getApi(ws);
      await api.isReady;
      const to = await getLatestFinalizedBlock(api);

      const remarkBlocks = await fetchRemarks(api, chunkyBlock, to, ['']);

      if (remarkBlocks) {
        const remarks = getRemarksFromBlocks(remarkBlocks, ['']);
        const consolidator = new Consolidator();
        const { nfts, collections } = await consolidator.consolidate(remarks);
        for(const nft in nfts) {
            console.log('Owner:', nfts[nft].owner);
        }
      }
      
      console.log("Finished getting owners");
      process.exit(0);
    } catch (error: any) {
      console.error(error);
      process.exit(0);
    }
  }

getNFTOwner(BLOCK_NUMBER).then(() => console.log("finished."));