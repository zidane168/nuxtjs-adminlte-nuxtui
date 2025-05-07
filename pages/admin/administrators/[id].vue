<template> 
    <div> Here is route.param.id content Event id: {{ $route.params.id }} </div>    

    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="FirstName" name="firstName">
            <UInput v-model="currentAdmin.firstName"    class="w-full"/>
        </UFormField>

        <UFormField label="lastName" name="lastName">
            <UInput v-model="currentAdmin.lastName" class="w-full" />
        </UFormField> 

        <UFormField label="Email" name="email">
            <UInput v-model="currentAdmin.email"  class="w-full" />
        </UFormField> 

        <UFormField label="Age" name="age">
            <UInput v-model="currentAdmin.age"  class="w-full" />
        </UFormField> 

        <!--
        <UFormField label="birthDate" name="birthDate">
            <UCalendar v-model="currentAdmin.birthDate"  class="w-[300px]" />
        </UFormField>  
       -->

        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>
 

<script setup lang="ts">
import { useAdministratorStore } from '~/stores/administrator'; 
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const route = useRoute();
const administratorStore = useAdministratorStore();
await administratorStore.getAdminById( route.params.id );

const currentAdmin = computed(() => administratorStore.currentAdministrator); 

const state = reactive({
  email: undefined,
  firstName: undefined,
  lastName: undefined, 
  age: undefined,
  birthDate: undefined 
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.firstName) errors.push({ name: 'firstName', message: 'Required' })
  if (!state.lastName) errors.push({ name: 'lastName', message: 'Required' })
  if (!state.age) errors.push({ name: 'age', message: 'Required' })
  if (!state.birthDate) errors.push({ name: 'birthDate', message: 'Required' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}


</script>