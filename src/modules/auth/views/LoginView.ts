import { defineComponent, ref } from 'vue';
import logoEmpresa from '@/assets/images/logo-dyv.6982403.png';

import { useForm } from 'vee-validate';
import * as yup from 'yup';

import { Button } from '@/components/ui/button';
import { useToast } from 'vue-toastification';
import { LoaderCircle } from 'lucide-vue-next';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '../stores/auth.store';
import router from '@/router';

export default defineComponent({
  components: {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    // eslint-disable-next-line vue/no-reserved-component-names
    Input,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Checkbox,
    LoaderCircle,
  },
  setup() {
    const toast = useToast();
    const authStore = useAuthStore();
    const isPending = ref(false);

    const validationSchema = yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
      rememberMe: yup.boolean(),
    });

    const initialValues = {
      username: localStorage.getItem('username') || '',
      password: '',
      rememberMe: localStorage.getItem('rememberMe') == 'true' ? true : false,
    };

    const form = useForm({
      validationSchema: validationSchema,
      initialValues: initialValues,
    });

    const onSubmit = form.handleSubmit(async (values) => {
      isPending.value = true;
      if (values.rememberMe) {
        localStorage.setItem('username', values.username);
        localStorage.setItem('rememberMe', values.rememberMe + '');
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('rememberMe');
      }

      const ok = await authStore.login(values.username, values.password);
      isPending.value = false;
      if (ok) {
        // console.log('Form submitted!', values);
        toast.success('Bienvenido!');
        router.replace({ name: 'not-found' });
      } else {
        toast.error('Usuario y/o contraseña inválida/s');
      }
    });
    return {
      logoEmpresa,
      onSubmit,
      isPending,
    };
  },
});
