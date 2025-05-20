import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerRootComponent } from "expo";
import App from "./App";

const queryClient = new QueryClient();

const Root = () => (
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);

registerRootComponent(Root);
