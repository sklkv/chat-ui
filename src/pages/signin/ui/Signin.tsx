import React from "react";
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
} from "@vkontakte/vkui";
import { FormField } from "@shared/ui";
import { useSignInApi } from "../api";
import { FORM_SCHEME } from "./scheme";
import { APP_ROUTES } from "@shared/model";
import { IFormFields } from "./types";

// TODO: отобразить errorMessage иначе
export const Signin = () => {
  const navigate = useNavigate();
  const formMethods = useForm<IFormFields>();
  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;
  const { isLoading, errorMessage, handleSignIn } = useSignInApi();

  const handleNavigateToChat = () => {
    navigate(APP_ROUTES.CHAT);
  };

  const handleNavigateToSignUp = () => {
    navigate(APP_ROUTES.SIGNUP);
  };

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    await handleSignIn({ data, successCallback: handleNavigateToChat });
  };
  return (
    <>
      <PanelHeader>Вход</PanelHeader>
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
              aria-label="Вход"
              size="l"
            >
              Войти
            </Button>
          </FormItem>
          <FormItem>
            <Link onClick={handleNavigateToSignUp}>или зарегистрироваться</Link>
          </FormItem>
        </FormLayout>
      </FormProvider>
      {isLoading ? <ScreenSpinner /> : null}
    </>
  );
};
