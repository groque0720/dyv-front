<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import { Button } from '@/components/ui/button';
import { useToast } from 'vue-toastification';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const toast = useToast();

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const initialValues = {
  username: 'groque',
  password: '',
};

const form = useForm({
  validationSchema: validationSchema,
  initialValues: initialValues,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
  toast.success('Form submitted!');
});

// const onSubmit = () => {
//   console.log('Form submitted!', form.values);
// };
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit"> Submit </Button>
  </form>
</template>
