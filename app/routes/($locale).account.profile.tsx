// import type {CustomerFragment} from 'customer-accountapi.generated';
// import type {CustomerUpdateInput} from '@shopify/hydrogen/customer-account-api-types';
// import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
// import {
//   data,
//   type ActionFunctionArgs,
//   type LoaderFunctionArgs,
// } from '@shopify/remix-oxygen';
// import {
//   Form,
//   useActionData,
//   useNavigation,
//   useOutletContext,
//   type MetaFunction,
// } from 'react-router';

// export type ActionResponse = {
//   error: string | null;
//   customer: CustomerFragment | null;
// };

// export const meta: MetaFunction = () => {
//   return [{title: 'Profile'}];
// };

// export async function loader({context}: LoaderFunctionArgs) {
//   await context.customerAccount.handleAuthStatus();

//   return {};
// }

// export async function action({request, context}: ActionFunctionArgs) {
//   const {customerAccount} = context;

//   if (request.method !== 'PUT') {
//     return data({error: 'Method not allowed'}, {status: 405});
//   }

//   const form = await request.formData();

//   try {
//     const customer: CustomerUpdateInput = {};
//     const validInputKeys = ['firstName', 'lastName'] as const;
//     for (const [key, value] of form.entries()) {
//       if (!validInputKeys.includes(key as any)) {
//         continue;
//       }
//       if (typeof value === 'string' && value.length) {
//         customer[key as (typeof validInputKeys)[number]] = value;
//       }
//     }

//     // update customer and possibly password
//     const {data, errors} = await customerAccount.mutate(
//       CUSTOMER_UPDATE_MUTATION,
//       {
//         variables: {
//           customer,
//         },
//       },
//     );

//     if (errors?.length) {
//       throw new Error(errors[0].message);
//     }

//     if (!data?.customerUpdate?.customer) {
//       throw new Error('Customer profile update failed.');
//     }

//     return {
//       error: null,
//       customer: data?.customerUpdate?.customer,
//     };
//   } catch (error: any) {
//     return data(
//       {error: error.message, customer: null},
//       {
//         status: 400,
//       },
//     );
//   }
// }

// export default function AccountProfile() {
//   const account = useOutletContext<{customer: CustomerFragment}>();
//   const {state} = useNavigation();
//   const action = useActionData<ActionResponse>();
//   const customer = action?.customer ?? account?.customer;

//   return (
//     <div className="account-profile">
//       <h2>My profile</h2>
//       <br />
//       <Form method="PUT">
//         <legend>Personal information</legend>
//         <fieldset>
//           <label htmlFor="firstName">First name</label>
//           <input
//             id="firstName"
//             name="firstName"
//             type="text"
//             autoComplete="given-name"
//             placeholder="First name"
//             aria-label="First name"
//             defaultValue={customer.firstName ?? ''}
//             minLength={2}
//           />
//           <label htmlFor="lastName">Last name</label>
//           <input
//             id="lastName"
//             name="lastName"
//             type="text"
//             autoComplete="family-name"
//             placeholder="Last name"
//             aria-label="Last name"
//             defaultValue={customer.lastName ?? ''}
//             minLength={2}
//           />
//         </fieldset>
//         {action?.error ? (
//           <p>
//             <mark>
//               <small>{action.error}</small>
//             </mark>
//           </p>
//         ) : (
//           <br />
//         )}
//         <button type="submit" disabled={state !== 'idle'}>
//           {state !== 'idle' ? 'Updating' : 'Update'}
//         </button>
//       </Form>
//     </div>
//   );
// }



import type {CustomerFragment} from 'customer-accountapi.generated';
import type {CustomerUpdateInput} from '@shopify/hydrogen/customer-account-api-types';
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  type MetaFunction,
} from 'react-router';

export type ActionResponse = {
  error: string | null;
  customer: CustomerFragment | null;
};

export const meta: MetaFunction = () => {
  return [{title: 'Profile'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: ActionFunctionArgs) {
  const {customerAccount} = context;

  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
    const customer: CustomerUpdateInput = {};
    const validInputKeys = ['firstName', 'lastName'] as const;
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key as any)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key as (typeof validInputKeys)[number]] = value;
      }
    }

    // update customer and possibly password
    const {data, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!data?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return {
      error: null,
      customer: data?.customerUpdate?.customer,
    };
  } catch (error: any) {
    return data(
      {error: error.message, customer: null},
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  const account = useOutletContext<{customer: CustomerFragment}>();
  const {state} = useNavigation();
  const action = useActionData<ActionResponse>();
  const customer = action?.customer ?? account?.customer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <Form method="PUT" className="p-6">
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your personal details
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label 
                htmlFor="firstName" 
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="First name"
                  aria-label="First name"
                  defaultValue={customer.firstName ?? ''}
                  minLength={2}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label 
                htmlFor="lastName" 
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Last name"
                  aria-label="Last name"
                  defaultValue={customer.lastName ?? ''}
                  minLength={2}
                />
              </div>
            </div>
          </div>

          {action?.error ? (
            <div className="mt-6 bg-red-50 text-red-700 p-3 rounded-md text-sm">
              <p>{action.error}</p>
            </div>
          ) : (
            <div className="mt-6" />
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={state !== 'idle'}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 min-w-[120px]"
            >
              {state !== 'idle' ? (
                <>
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}