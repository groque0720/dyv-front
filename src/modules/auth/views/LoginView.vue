<template>
  <div class="content-login">
    <Card class="content-form">
      <CardHeader>
        <img class="logo-empresa" :src="logoEmpresa" alt="" />
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <!--  -->
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input type="text" placeholder="" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!--  --><br />
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!--   --><br />
          <FormField v-slot="{ value, handleChange }" type="checkbox" name="rememberMe">
            <FormItem>
              <FormControl>
                <Checkbox :checked="value" @update:checked="handleChange" />
              </FormControl>
              <FormLabel class="ml-2">Acuérdate de mí</FormLabel>
            </FormItem>
          </FormField>

          <!--  -->
        </form>
      </CardContent>

      <!--  -->
      <CardFooter class="form-footer">
        <Button type="submit" @click="onSubmit" :disabled="isPending">
          <LoaderCircle v-if="isPending" class="animate-spin"></LoaderCircle>
          <span>Acceder</span>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script lang="ts" src="./LoginView.ts"></script>

<style scoped>
.content-login {
  @apply flex h-screen;
}

.content-form {
  @apply m-auto w-[30rem];
}
.logo-empresa {
  @apply m-auto w-72;
}

.form-footer {
  @apply flex justify-end;
}
</style>
