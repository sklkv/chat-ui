import React, { FC, ChangeEvent } from "react";
import {
	PanelHeader,
	Group,
	FormLayout,
	FormItem,
	Input,
	Button,
} from "@vkontakte/vkui";

interface IEntranceProps {
  nickname: string;
  onNicknameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: VoidFunction;
}

export const Entrance: FC<IEntranceProps> = ({
	nickname,
	onNicknameChange,
	onSubmit,
}) => {
	return (
		<>
			<PanelHeader>Вход в чат</PanelHeader>
			<Group>
				<FormLayout onSubmit={onSubmit}>
					<FormItem
						htmlFor="nickname"
						top="Имя"
						bottom={nickname ? null : "Пожалуйста, введите свое имя"}
						bottomId="nickname-type"
					>
						<Input
							aria-labelledby="nickname-type"
							id="nickname"
							type="nickname"
							name="nickname"
							value={nickname}
							onChange={onNicknameChange}
						/>
					</FormItem>
					<FormItem>
						<Button
							appearance="accent"
							align="center"
							disabled={!nickname}
							stretched
							onClick={onSubmit}
							aria-label="Вход"
							size="l"
						>
              Войти
						</Button>
					</FormItem>
				</FormLayout>
			</Group>
		</>
	);
};
