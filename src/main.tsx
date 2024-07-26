import "./index.css";
import Router from "./Router.tsx";

//
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { config } from "./wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { lightTheme } from "@rainbow-me/rainbowkit";

const queryClient = new QueryClient();

import {
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="/Disclaimer">Terms of Service</Link> and acknowledge you have
    read and understand the protocol <Link href="/Disclaimer">Disclaimer</Link>
  </Text>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#000",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
          })}
          showRecentTransactions={true}
          appInfo={{
            appName: "RainbowKit Demo",
            disclaimer: Disclaimer,
          }}
          coolMode
        >
          <Router />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// 0x72805661557035298b11834EAB468bDFe7966f92