import React from "react";
import { useNavigate } from "react-router-dom";
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
import { APP_ROUTES } from "@shared/model";
import { IFormFields } from "./types";

export const Signup = () => {
  const navigate = useNavigate();
  const formMethods = useForm<IFormFields>();
  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
  };

  const handleNavigateToSignIn = () => {
    navigate(APP_ROUTES.SIGNIN);
  };

  return (
    <>
      <PanelHeader>Регистрация</PanelHeader>
      <Group>
        <FormProvider {...formMethods}>
          <FormLayout onSubmit={handleSubmit(onSubmit)}>
            {FORM_SCHEME.map(
              ({
                name,
                formItemProps,
                componentProps = {},
                registerOptions,
                Component,
              }) => (
                <FormField
                  key={name}
                  name={name}
                  formItemProps={formItemProps}
                  registerOptions={registerOptions}
                >
                  <Component {...componentProps} />
                </FormField>
              )
            )}
            <FormItem>
              <Button
                appearance="accent"
                align="center"
                disabled={!!Object.keys(errors).length}
                stretched
                onClick={handleSubmit(onSubmit)}
                aria-label="Далее"
                size="l"
              >
                Зарегистрироваться
              </Button>
            </FormItem>
            <FormItem>
              <Link onClick={handleNavigateToSignIn}>или войти</Link>
            </FormItem>
          </FormLayout>
        </FormProvider>
      </Group>
    </>
  );
};
