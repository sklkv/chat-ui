import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { Flex, Text, Link, Card, Box } from "@radix-ui/themes";
import { FormField, Button } from "@shared/ui";
import { APP_ROUTES } from "@shared/model";
import { useSignUpApi } from "../api";
import { FORM_SCHEME } from "./scheme";
import { IFormFields } from "./types";

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
    console.log(data);
    await handleSignUp({ data, successCallback: handleSetSuccess });
  };

  // TODO: refactor inline styles, add loader
  return (
    <Box minWidth="540px">
    <Card size="5" variant="ghost">
      <Text as="div" size="5" mb="1" weight="medium" align="center">
        Регистрация
      </Text>
      {hasSuccess ? (
        <div>
          success <Button onClick={handleNavigateToSignIn}>Вход</Button>
        </div>
      ) : (
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              <Flex direction="column" gap="3">
                {FORM_SCHEME.map(
                  ({
                    name,
                    labelProps,
                    componentProps = {},
                    registerOptions,
                    Component,
                  }) => (
                    <FormField
                      key={name}
                      name={name}
                      labelProps={labelProps}
                      registerOptions={registerOptions}
                    >
                      <Component {...componentProps} />
                    </FormField>
                  )
                )}
              </Flex>
              <Flex direction="column" gap="2">
                {errorMessage ? (
                  <Text size="2" color="red">
                    {errorMessage}
                  </Text>
                ) : null}
                <Button
                  disabled={!!Object.keys(errors).length}
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  Зарегистрироваться
                </Button>
                <Link onClick={handleNavigateToSignIn} size="2">
                  или войти
                </Link>
              </Flex>
            </Flex>
          </form>
        </FormProvider>
      )}
    </Card>
    </Box>
  );
};
