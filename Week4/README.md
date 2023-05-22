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
yarn hardhat compile
yarn hardhat run scripts/...

Then pick the smart contracts addresses