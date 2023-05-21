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

## Running voting-dapp frontend scripts (port 3000):
```
cd /voting-dapp/frontend
yarn && yarn build
yarn start
```

### NOTE: remember to configure the .env file into every project by following the .env.example file