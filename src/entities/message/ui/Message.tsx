import React, { FC, useMemo } from "react";
import { Tappable, Text } from "@vkontakte/vkui";
import { IMessageProps } from "./types";
import "./styles.css";

export const Message: FC<IMessageProps> = ({ from, message }) => {
	const messageRows = useMemo(() => message.split("\n"), []);
	return (
		<Tappable className="message-wrapper" hasActive activated>
			<div className="author">{from}</div>
			{messageRows.map((item, index) => (
				<Text key={index} className="message">
					{item}
				</Text>
			))}
		</Tappable>
	);
};
