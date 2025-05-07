<template> 
    <div> Here is route.param.id content Event id: {{ $route.params.id }} </div>     
    <hr />

    <!--<UForm  :validate="validate" :state="state" class="space-y-4" @submit="onSubmit"> -->

    <UForm :schema="schema"   class="space-y-4" @submit="onSubmit"> 
        <UFormField :label='t("administrator.firstName")' name="firstName">  <!-- label: "firstName" :label='t("administrator.firstName")'-->
            <UInput v-model="firstName"    class="w-full"  @input="updateFirstName" />  
        </UFormField>

        <UFormField :label="t('administrator.lastName')" name="lastName">
            <UInput v-model="lastName" class="w-full"  @input="updateLastName" />
        </UFormField> 

        <UFormField :label="t('administrator.email')" name="email">
            <UInput v-model="email"  class="w-full"  @input="updateEmail" />
        </UFormField> 

        <UFormField :label="t('administrator.age')" name="age">
            <UInput v-model="age"  class="w-full"  @input="updateAge"/>
        </UFormField> 
 
        <UFormField :label="t('administrator.birthDate')" name="birthDate">
            <UCalendar  class="w-[300px]" @change="updateBirthDate"  v-model="birthDate"  />
        </UFormField>   

        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>
 

<script setup lang="ts">
import { useAdministratorStore } from '~/stores/administrator'; 
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { object, string, type InferType } from 'yup'

const { t } = useI18n(); 

const schema = object({
    firstName: string()
        .min(2, 'Must be at least 2 characters')
        .required('Required xxx'),

    lastName: string().min(2, t('administrator.firstNameError')).required('Required xx'), 

    // email: string().email('Invalid email').required('Required'),
    email: string().email('Invalid email'),
   
})

type Schema = InferType<typeof schema>

// const state = reactive({
//   email: undefined,
//   firstName: undefined,
//   lastName: undefined, 
//   age: undefined,
//   birthDate: undefined 
// })

const route = useRoute();
const administratorStore = useAdministratorStore();
await administratorStore.getAdminById( route.params.id );

const currentAdmin = computed(() => administratorStore.currentAdministrator); 

let firstName = ref(currentAdmin.firstName);

console.log (' -=-=-=-=-=> ')
console.log (firstName);
console.log (' -=-=-=-=-=> ')

let lastName = ref(currentAdmin.lastName);
let email = ref(currentAdmin.email);
let age = ref(currentAdmin.age);
let birthDate = ref(currentAdmin.birthDate);


// Update store and refs when input changes
function updateFirstName() {
    firstName = currentAdmin.firstName; // Sync initial value
    administratorStore.currentAdministrator.firstName = firstName;
}

function updateLastName() {
    lastName = currentAdmin.lastName; // Sync initial value
    administratorStore.currentAdministrator.lastName = lastName;
}

function updateEmail() {
    email = currentAdmin.email; // Sync initial value
    administratorStore.currentAdministrator.email = email;
}

function updateAge() {
    age = currentAdmin.age; // Sync initial value
    administratorStore.currentAdministrator.age = age;
}

function updateBirthDate(date) {
    birthDate = date; // Update local ref
    administratorStore.currentAdministrator.birthDate = date; // Update store
}
 
// const validate = (state: any): FormError[] => {
//   const errors = []
//   if (!state.email) errors.push({ name: 'email', message: 'Required' })
//   if (!state.firstName) errors.push({ name: 'firstName', message: 'Required' })
//   if (!state.lastName) errors.push({ name: 'lastName', message: 'Required' })
//   if (!state.age) errors.push({ name: 'age', message: 'Required' })
//   if (!state.birthDate) errors.push({ name: 'birthDate', message: 'Required' })
//   return errors
// }


const toast = useToast()
async function onSubmit(event: FormSubmitEvent<typeof state>) {
    event.preventDefault()

    const updateData = {
        firstName: currentAdmin.firstName,
        lastName: currentAdmin.lastName,
        age: currentAdmin.age,
        email: currentAdmin.email
    }

    const flag = await administratorStore.updateAdmin( route.params.id, updateData )
    if (flag) {
        toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    } else {
        toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'error' })
    } 
}
 

 

</script>