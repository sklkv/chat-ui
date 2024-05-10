import { ITextMessageProps } from "@shared/ui";

export const MOCK_MESSAGES: ITextMessageProps[] = new Array(3)
  .fill(null)
  .map((_, index) => ({
    id: index,
    title: `Test ${index}`,
    text: "some text",
    position: index % 2 ? "left" : "right",
    titleColor: index % 2 ? "red" : "blue",
    date: new Date(),
    status: "read",
  }));
