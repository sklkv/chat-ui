import React from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import {
  PanelHeader,
  Group,
  FormLayout,
  FormItem,
  Button,
  Link,
} from "@vkontakte/vkui";
import { FormField } from "@shared/ui";
import { FORM_SCHEME } from "./scheme";
import { IFormFields } from "./types";

export const Signin = () => {
  const formMethods = useForm<IFormFields>();
  const { handleSubmit } = formMethods;
  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
  };
  return (
    <>
      <PanelHeader>Вход</PanelHeader>
      <Group>
        <FormProvider {...formMethods}>
          <FormLayout onSubmit={handleSubmit(onSubmit)}>
            {FORM_SCHEME.map(
              ({ name, formItemProps, componentProps = {}, Component }) => (
                <FormField name={name} formItemProps={formItemProps} key={name}>
                  <Component {...componentProps} />
                </FormField>
              )
            )}
            <FormItem>
              <Button
                appearance="accent"
                align="center"
                // disabled={}
                stretched
                onClick={handleSubmit(onSubmit)}
                aria-label="Вход"
                size="l"
              >
                Войти
              </Button>
            </FormItem>
            <FormItem>
              <Link href="/signup">или зарегистрироваться</Link>
            </FormItem>
          </FormLayout>
        </FormProvider>
      </Group>
    </>
  );
};
