# VOTING DAPP

## Running voting-api (port 3001):
```
cd /voting-api
yarn && yarn start:dev
```

## Running voting-dapp backend scripts:
```
cd /voting-dapp/backend
yarn && yarn compile
yarn hardhat run /scripts/[script-name].ts
```

## Running voting-dapp frontend (port 3000):
```
cd /voting-dapp/frontend
yarn && yarn build
yarn start
```

### NOTE: remember to configure the .env file into every project by following the .env.example file


INTRUCTIONS:

1. Compile and deploy smart contracts from voting-dapp/backend directory by running:
```
cd /voting-dapp/backend
yarn hardhat compile
yarn hardhat run scripts/deploy-my-erc-20-votes-and-tokenized-ballot.ts
```

Then pick the smart contracts addresses and put them in respective .env files

2. Run voting-api and voting-dapp/frontend as described above

3. Start interacting with the UI served at http://localhost:3000