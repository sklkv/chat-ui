import { useNavigate } from "react-router-dom";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { Flex, Text, Link, Card, Box } from "@radix-ui/themes";
import { FormField, Button } from "@shared/ui";
import { useSignInApi } from "../api";
import { FORM_SCHEME } from "./scheme";
import { APP_ROUTES } from "@shared/model";
import { IFormFields } from "./types";

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
    console.log(data);
    await handleSignIn({ data, successCallback: handleNavigateToChat });
  };

  return (
    <Box minWidth="540px">
      <Card size="5" variant="ghost">
        <Text as="div" size="5" mb="1" weight="medium" align="center">
          Вход
        </Text>
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
                  Войти
                </Button>
                <Link onClick={handleNavigateToSignUp} size="2">
                  или зарегистрироваться
                </Link>
              </Flex>
            </Flex>
          </form>
        </FormProvider>
      </Card>
    </Box>
  );
};
