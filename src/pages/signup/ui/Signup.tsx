import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import {
  PanelHeader,
  FormLayout,
  FormItem,
  Button,
  Link,
  ScreenSpinner,
  Caption,
  Placeholder,
} from "@vkontakte/vkui";
import { Icon56CheckCircleOutline } from "@vkontakte/icons";
import { FormField } from "@shared/ui";
import { APP_ROUTES } from "@shared/model";
import { useSignUpApi } from "../api";
import { FORM_SCHEME } from "./scheme";
import { IFormFields } from "./types";

// TODO: отобразить errorMessage иначе
export const Signup = () => {
  const [hasSuccess, setHasSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const formMethods = useForm<IFormFields>();
  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const { isLoading, errorMessage, handleSignUp } = useSignUpApi();

  const handleNavigateToSignIn = () => {
    navigate(APP_ROUTES.SIGNIN);
  };

  const handleSetSuccess = () => setHasSuccess(true);

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    await handleSignUp({ data, successCallback: handleSetSuccess });
  };

  return (
    <>
      <PanelHeader>Регистрация</PanelHeader>
      {hasSuccess ? (
        <Placeholder
          header="Регистрация прошла успешно!"
          icon={<Icon56CheckCircleOutline />}
          action={
            <Button size="m" onClick={handleNavigateToSignIn}>
              Вход
            </Button>
          }
        />
      ) : (
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
            {errorMessage ? (
              <FormItem>
                <Caption>{errorMessage}</Caption>
              </FormItem>
            ) : null}
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
      )}
      {isLoading ? <ScreenSpinner /> : null}
    </>
  );
};
