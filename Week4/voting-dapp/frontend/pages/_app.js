import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import {
	polygon,
	polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import { useRouter } from "next/router";
import { Sumer } from 'sumer-sdk'

Sumer.init({
	dappKey: '8c1b18a8-17df-4d6b-871d-ce1f7bac9da7',
	dns: 'https://demo.api.getsumer.com',
})

const { chains, provider } = configureChains(
	[
		polygon,
		polygonMumbai,
	],
	[
		publicProvider(),
		alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }),
	]
);

const { connectors } = getDefaultWallets({
	appName: "Voting DApp",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider: Sumer.observe(provider),
});

export { WagmiConfig, RainbowKitProvider };

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const account = useAccount({
		onConnect({ address, connector, isReconnected }) {
			if (!isReconnected) router.reload();
		},
	});
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
