import React, { ChangeEvent, useState } from "react";
import {
	AdaptivityProvider,
	ConfigProvider,
	AppRoot,
	SplitLayout,
	SplitCol,
	View,
	Panel,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { WsProvider } from "@shared/ui";
import { Entrance } from "@pages/entrance";
import { Chat } from "@pages/chat";

// StrictMode выключен тк двойной рендер влияет на подключение вебсокета
export default function App() {
	const [view, setView] = useState<"entrance" | "chat">("entrance");
	const [nickname, setNickname] = useState<string>("");

	const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
	};

	const onSubmit = () => {
		nickname && setView("chat");
	};

	return (
	// <StrictMode>
		<ConfigProvider platform="vkcom" appearance="light">
			<AdaptivityProvider>
				<AppRoot mode="full">
					<SplitLayout style={{ justifyContent: "center" }}>
						<SplitCol maxWidth="900px">
							<WsProvider>
								<View activePanel={view}>
									<Panel id="entrance">
										<Entrance
											nickname={nickname}
											onNicknameChange={onNicknameChange}
											onSubmit={onSubmit}
										/>
									</Panel>
									<Panel id="chat">
										<Chat nickname={nickname} />
									</Panel>
								</View>
							</WsProvider>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	// </StrictMode>
	);
}
