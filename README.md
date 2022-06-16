# RMRK2 Examples

This repository showcases a collection of examples on how to use RMRK2 in it's current implementation (using `system.remark` exstrinsic)
You can find Crowdcast demo of using this code here: https://www.crowdcast.io/e/buidl

This is a monorepo, so do `yarn install` from the root of this repo

![Chunkies](chunkies.png)

This example shows how to create a composable NFT using [Base](https://github.com/rmrk-team/rmrk-spec/blob/2.0-wip/standards/rmrk2.0.0/entities/base.md) entity of type SVG. As well as nested NFTs equippable into chunky hands

## Scripts

Under `/projects/scripts` you can find all the minting scripts that you can run from CLI

### (RoosterDAO) testing NFTs Interaction
to run the project under `/projects/scripts`, you must first start a local node. You can use the following node:
- https://github.com/RoosterDao/rmrk-contracts-node

to run the node, use the following command:

`$ cargo run --release -- --dev --tmp --pruning=archive`

The `--pruning=archive` options is needed in order for rmrk-tools to work (see this issue: https://github.com/paritytech/substrate-api-sidecar/issues/309).

The basic workflow for minting NFT is the following:
1. you create a BASE, which is a resource you can attach to an NFT. A BASE represents all of the possible output of an NFT (See here for more: https://docs.rmrk.app/lego25-equippable/)
2. you create a Collection
3. you mint NFTs inside the Collection

Once you have done the following three steps, NFTs are saved on the Kusama parachain. 
When you want to retrieve Remarkable NFTs, you must parse all the blocks of the blockchain and search for RMRK nfts.
You can specify a range of blocks to search. For example if you know on which block the NFT collection was minted, you can start searching from this block number.
Once you fetched all the RMRK, you must consolidate them in a final state.
Once you have the final state, you can read their properties (for example, getting the owner)

See here for more about Synchronization:
- https://docs.rmrk.app/syncing

Before minting the collection, you must set the API KEY of your Pinata account in the `.env` file (PINATA_KEY and PINATA_SECRET)

Then, mint an NFT collection with the following command:

`$ npx ts-node ./run-mint-sequence.ts`

Look at the output of the command, and grep the block number at the following line:

`[ . . . ]`

`Chunky NFT minted at block:  10`

`[ . . . ]`

Then, put the block number on the BLOCK_NUMBER variable inside the `getNFTOwner.ts` script. For example in this case BLOCK_NUMBER will be 10.

Then, once minted, you can retrieve the NFTs properties (in this case only the Owner), by using the following script:

`$ npx ts-node ./getNFTOwner.ts`

## React demo

Under `/projects/react-demo` you can find a simple Next.js react app and an example of SVG composer component that composes single image from all the Base parts and nested NFTs of each parent Chunky

### TODO
port this code in Rust using https://github.com/rmrk-team/rmrk-substrate