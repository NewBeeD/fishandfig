// import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
// import type {
//   AddressFragment,
//   CustomerFragment,
// } from 'customer-accountapi.generated';
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
//   type Fetcher,
// } from 'react-router';
// import {
//   UPDATE_ADDRESS_MUTATION,
//   DELETE_ADDRESS_MUTATION,
//   CREATE_ADDRESS_MUTATION,
// } from '~/graphql/customer-account/CustomerAddressMutations';

// export type ActionResponse = {
//   addressId?: string | null;
//   createdAddress?: AddressFragment;
//   defaultAddress?: string | null;
//   deletedAddress?: string | null;
//   error: Record<AddressFragment['id'], string> | null;
//   updatedAddress?: AddressFragment;
// };

// export const meta: MetaFunction = () => {
//   return [{title: 'Addresses'}];
// };

// export async function loader({context}: LoaderFunctionArgs) {
//   await context.customerAccount.handleAuthStatus();

//   return {};
// }

// export async function action({request, context}: ActionFunctionArgs) {
//   const {customerAccount} = context;

//   try {
//     const form = await request.formData();

//     const addressId = form.has('addressId')
//       ? String(form.get('addressId'))
//       : null;
//     if (!addressId) {
//       throw new Error('You must provide an address id.');
//     }

//     // this will ensure redirecting to login never happen for mutatation
//     const isLoggedIn = await customerAccount.isLoggedIn();
//     if (!isLoggedIn) {
//       return data(
//         {error: {[addressId]: 'Unauthorized'}},
//         {
//           status: 401,
//         },
//       );
//     }

//     const defaultAddress = form.has('defaultAddress')
//       ? String(form.get('defaultAddress')) === 'on'
//       : false;
//     const address: CustomerAddressInput = {};
//     const keys: (keyof CustomerAddressInput)[] = [
//       'address1',
//       'address2',
//       'city',
//       'company',
//       'territoryCode',
//       'firstName',
//       'lastName',
//       'phoneNumber',
//       'zoneCode',
//       'zip',
//     ];

//     for (const key of keys) {
//       const value = form.get(key);
//       if (typeof value === 'string') {
//         address[key] = value;
//       }
//     }

//     switch (request.method) {
//       case 'POST': {
//         // handle new address creation
//         try {
//           const {data, errors} = await customerAccount.mutate(
//             CREATE_ADDRESS_MUTATION,
//             {
//               variables: {address, defaultAddress},
//             },
//           );

//           if (errors?.length) {
//             throw new Error(errors[0].message);
//           }

//           if (data?.customerAddressCreate?.userErrors?.length) {
//             throw new Error(data?.customerAddressCreate?.userErrors[0].message);
//           }

//           if (!data?.customerAddressCreate?.customerAddress) {
//             throw new Error('Customer address create failed.');
//           }

//           return {
//             error: null,
//             createdAddress: data?.customerAddressCreate?.customerAddress,
//             defaultAddress,
//           };
//         } catch (error: unknown) {
//           if (error instanceof Error) {
//             return data(
//               {error: {[addressId]: error.message}},
//               {
//                 status: 400,
//               },
//             );
//           }
//           return data(
//             {error: {[addressId]: error}},
//             {
//               status: 400,
//             },
//           );
//         }
//       }

//       case 'PUT': {
//         // handle address updates
//         try {
//           const {data, errors} = await customerAccount.mutate(
//             UPDATE_ADDRESS_MUTATION,
//             {
//               variables: {
//                 address,
//                 addressId: decodeURIComponent(addressId),
//                 defaultAddress,
//               },
//             },
//           );

//           if (errors?.length) {
//             throw new Error(errors[0].message);
//           }

//           if (data?.customerAddressUpdate?.userErrors?.length) {
//             throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
//           }

//           if (!data?.customerAddressUpdate?.customerAddress) {
//             throw new Error('Customer address update failed.');
//           }

//           return {
//             error: null,
//             updatedAddress: address,
//             defaultAddress,
//           };
//         } catch (error: unknown) {
//           if (error instanceof Error) {
//             return data(
//               {error: {[addressId]: error.message}},
//               {
//                 status: 400,
//               },
//             );
//           }
//           return data(
//             {error: {[addressId]: error}},
//             {
//               status: 400,
//             },
//           );
//         }
//       }

//       case 'DELETE': {
//         // handles address deletion
//         try {
//           const {data, errors} = await customerAccount.mutate(
//             DELETE_ADDRESS_MUTATION,
//             {
//               variables: {addressId: decodeURIComponent(addressId)},
//             },
//           );

//           if (errors?.length) {
//             throw new Error(errors[0].message);
//           }

//           if (data?.customerAddressDelete?.userErrors?.length) {
//             throw new Error(data?.customerAddressDelete?.userErrors[0].message);
//           }

//           if (!data?.customerAddressDelete?.deletedAddressId) {
//             throw new Error('Customer address delete failed.');
//           }

//           return {error: null, deletedAddress: addressId};
//         } catch (error: unknown) {
//           if (error instanceof Error) {
//             return data(
//               {error: {[addressId]: error.message}},
//               {
//                 status: 400,
//               },
//             );
//           }
//           return data(
//             {error: {[addressId]: error}},
//             {
//               status: 400,
//             },
//           );
//         }
//       }

//       default: {
//         return data(
//           {error: {[addressId]: 'Method not allowed'}},
//           {
//             status: 405,
//           },
//         );
//       }
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return data(
//         {error: error.message},
//         {
//           status: 400,
//         },
//       );
//     }
//     return data(
//       {error},
//       {
//         status: 400,
//       },
//     );
//   }
// }

// export default function Addresses() {
//   const {customer} = useOutletContext<{customer: CustomerFragment}>();
//   const {defaultAddress, addresses} = customer;

//   return (
//     <div className="account-addresses">
//       <h2>Addresses</h2>
//       <br />
//       {!addresses.nodes.length ? (
//         <p>You have no addresses saved.</p>
//       ) : (
//         <div>
//           <div>
//             <legend>Create address</legend>
//             <NewAddressForm />
//           </div>
//           <br />
//           <hr />
//           <br />
//           <ExistingAddresses
//             addresses={addresses}
//             defaultAddress={defaultAddress}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// function NewAddressForm() {
//   const newAddress = {
//     address1: '',
//     address2: '',
//     city: '',
//     company: '',
//     territoryCode: '',
//     firstName: '',
//     id: 'new',
//     lastName: '',
//     phoneNumber: '',
//     zoneCode: '',
//     zip: '',
//   } as CustomerAddressInput;

//   return (
//     <AddressForm
//       addressId={'NEW_ADDRESS_ID'}
//       address={newAddress}
//       defaultAddress={null}
//     >
//       {({stateForMethod}) => (
//         <div>
//           <button
//             disabled={stateForMethod('POST') !== 'idle'}
//             formMethod="POST"
//             type="submit"
//           >
//             {stateForMethod('POST') !== 'idle' ? 'Creating' : 'Create'}
//           </button>
//         </div>
//       )}
//     </AddressForm>
//   );
// }

// function ExistingAddresses({
//   addresses,
//   defaultAddress,
// }: Pick<CustomerFragment, 'addresses' | 'defaultAddress'>) {
//   return (
//     <div>
//       <legend>Existing addresses</legend>
//       {addresses.nodes.map((address) => (
//         <AddressForm
//           key={address.id}
//           addressId={address.id}
//           address={address}
//           defaultAddress={defaultAddress}
//         >
//           {({stateForMethod}) => (
//             <div>
//               <button
//                 disabled={stateForMethod('PUT') !== 'idle'}
//                 formMethod="PUT"
//                 type="submit"
//               >
//                 {stateForMethod('PUT') !== 'idle' ? 'Saving' : 'Save'}
//               </button>
//               <button
//                 disabled={stateForMethod('DELETE') !== 'idle'}
//                 formMethod="DELETE"
//                 type="submit"
//               >
//                 {stateForMethod('DELETE') !== 'idle' ? 'Deleting' : 'Delete'}
//               </button>
//             </div>
//           )}
//         </AddressForm>
//       ))}
//     </div>
//   );
// }

// export function AddressForm({
//   addressId,
//   address,
//   defaultAddress,
//   children,
// }: {
//   addressId: AddressFragment['id'];
//   address: CustomerAddressInput;
//   defaultAddress: CustomerFragment['defaultAddress'];
//   children: (props: {
//     stateForMethod: (method: 'PUT' | 'POST' | 'DELETE') => Fetcher['state'];
//   }) => React.ReactNode;
// }) {
//   const {state, formMethod} = useNavigation();
//   const action = useActionData<ActionResponse>();
//   const error = action?.error?.[addressId];
//   const isDefaultAddress = defaultAddress?.id === addressId;
//   return (
//     <Form id={addressId}>
//       <fieldset>
//         <input type="hidden" name="addressId" defaultValue={addressId} />
//         <label htmlFor="firstName">First name*</label>
//         <input
//           aria-label="First name"
//           autoComplete="given-name"
//           defaultValue={address?.firstName ?? ''}
//           id="firstName"
//           name="firstName"
//           placeholder="First name"
//           required
//           type="text"
//         />
//         <label htmlFor="lastName">Last name*</label>
//         <input
//           aria-label="Last name"
//           autoComplete="family-name"
//           defaultValue={address?.lastName ?? ''}
//           id="lastName"
//           name="lastName"
//           placeholder="Last name"
//           required
//           type="text"
//         />
//         <label htmlFor="company">Company</label>
//         <input
//           aria-label="Company"
//           autoComplete="organization"
//           defaultValue={address?.company ?? ''}
//           id="company"
//           name="company"
//           placeholder="Company"
//           type="text"
//         />
//         <label htmlFor="address1">Address line*</label>
//         <input
//           aria-label="Address line 1"
//           autoComplete="address-line1"
//           defaultValue={address?.address1 ?? ''}
//           id="address1"
//           name="address1"
//           placeholder="Address line 1*"
//           required
//           type="text"
//         />
//         <label htmlFor="address2">Address line 2</label>
//         <input
//           aria-label="Address line 2"
//           autoComplete="address-line2"
//           defaultValue={address?.address2 ?? ''}
//           id="address2"
//           name="address2"
//           placeholder="Address line 2"
//           type="text"
//         />
//         <label htmlFor="city">City*</label>
//         <input
//           aria-label="City"
//           autoComplete="address-level2"
//           defaultValue={address?.city ?? ''}
//           id="city"
//           name="city"
//           placeholder="City"
//           required
//           type="text"
//         />
//         <label htmlFor="zoneCode">State / Province*</label>
//         <input
//           aria-label="State/Province"
//           autoComplete="address-level1"
//           defaultValue={address?.zoneCode ?? ''}
//           id="zoneCode"
//           name="zoneCode"
//           placeholder="State / Province"
//           required
//           type="text"
//         />
//         <label htmlFor="zip">Zip / Postal Code*</label>
//         <input
//           aria-label="Zip"
//           autoComplete="postal-code"
//           defaultValue={address?.zip ?? ''}
//           id="zip"
//           name="zip"
//           placeholder="Zip / Postal Code"
//           required
//           type="text"
//         />
//         <label htmlFor="territoryCode">Country Code*</label>
//         <input
//           aria-label="territoryCode"
//           autoComplete="country"
//           defaultValue={address?.territoryCode ?? ''}
//           id="territoryCode"
//           name="territoryCode"
//           placeholder="Country"
//           required
//           type="text"
//           maxLength={2}
//         />
//         <label htmlFor="phoneNumber">Phone</label>
//         <input
//           aria-label="Phone Number"
//           autoComplete="tel"
//           defaultValue={address?.phoneNumber ?? ''}
//           id="phoneNumber"
//           name="phoneNumber"
//           placeholder="+16135551111"
//           pattern="^\+?[1-9]\d{3,14}$"
//           type="tel"
//         />
//         <div>
//           <input
//             defaultChecked={isDefaultAddress}
//             id="defaultAddress"
//             name="defaultAddress"
//             type="checkbox"
//           />
//           <label htmlFor="defaultAddress">Set as default address</label>
//         </div>
//         {error ? (
//           <p>
//             <mark>
//               <small>{error}</small>
//             </mark>
//           </p>
//         ) : (
//           <br />
//         )}
//         {children({
//           stateForMethod: (method) => (formMethod === method ? state : 'idle'),
//         })}
//       </fieldset>
//     </Form>
//   );
// }




import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
import type {
  AddressFragment,
  CustomerFragment,
} from 'customer-accountapi.generated';
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
  type Fetcher,
} from 'react-router';
import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';

export type ActionResponse = {
  addressId?: string | null;
  createdAddress?: AddressFragment;
  defaultAddress?: string | null;
  deletedAddress?: string | null;
  error: Record<AddressFragment['id'], string> | null;
  updatedAddress?: AddressFragment;
};

export const meta: MetaFunction = () => {
  return [{title: 'Addresses'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: ActionFunctionArgs) {
  const {customerAccount} = context;

  try {
    const form = await request.formData();

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    // this will ensure redirecting to login never happen for mutatation
    const isLoggedIn = await customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return data(
        {error: {[addressId]: 'Unauthorized'}},
        {
          status: 401,
        },
      );
    }

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : false;
    const address: CustomerAddressInput = {};
    const keys: (keyof CustomerAddressInput)[] = [
      'address1',
      'address2',
      'city',
      'company',
      'territoryCode',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ];

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    switch (request.method) {
      case 'POST': {
        // handle new address creation
        try {
          const {data, errors} = await customerAccount.mutate(
            CREATE_ADDRESS_MUTATION,
            {
              variables: {address, defaultAddress},
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressCreate?.userErrors?.length) {
            throw new Error(data?.customerAddressCreate?.userErrors[0].message);
          }

          if (!data?.customerAddressCreate?.customerAddress) {
            throw new Error('Customer address create failed.');
          }

          return {
            error: null,
            createdAddress: data?.customerAddressCreate?.customerAddress,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'PUT': {
        // handle address updates
        try {
          const {data, errors} = await customerAccount.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
                defaultAddress,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
          }

          if (!data?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.');
          }

          return {
            error: null,
            updatedAddress: address,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'DELETE': {
        // handles address deletion
        try {
          const {data, errors} = await customerAccount.mutate(
            DELETE_ADDRESS_MUTATION,
            {
              variables: {addressId: decodeURIComponent(addressId)},
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressDelete?.userErrors?.length) {
            throw new Error(data?.customerAddressDelete?.userErrors[0].message);
          }

          if (!data?.customerAddressDelete?.deletedAddressId) {
            throw new Error('Customer address delete failed.');
          }

          return {error: null, deletedAddress: addressId};
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      default: {
        return data(
          {error: {[addressId]: 'Method not allowed'}},
          {
            status: 405,
          },
        );
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return data(
        {error: error.message},
        {
          status: 400,
        },
      );
    }
    return data(
      {error},
      {
        status: 400,
      },
    );
  }
}

export default function Addresses() {
  const {customer} = useOutletContext<{customer: CustomerFragment}>();
  const {defaultAddress, addresses} = customer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Addresses</h1>
      
      {!addresses.nodes.length ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 mb-4">You have no addresses saved.</p>
          <NewAddressForm />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Address</h2>
            <NewAddressForm />
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Saved Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ExistingAddresses
                addresses={addresses}
                defaultAddress={defaultAddress}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NewAddressForm() {
  const newAddress = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    territoryCode: '',
    firstName: '',
    id: 'new',
    lastName: '',
    phoneNumber: '',
    zoneCode: '',
    zip: '',
  } as CustomerAddressInput;

  return (
    <AddressForm
      addressId={'NEW_ADDRESS_ID'}
      address={newAddress}
      defaultAddress={null}
    >
      {({stateForMethod}) => (
        <div className="mt-4">
          <button
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            type="submit"
          >
            {stateForMethod('POST') !== 'idle' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Address'
            )}
          </button>
        </div>
      )}
    </AddressForm>
  );
}

function ExistingAddresses({
  addresses,
  defaultAddress,
}: Pick<CustomerFragment, 'addresses' | 'defaultAddress'>) {
  return (
    <>
      {addresses.nodes.map((address) => (
        <AddressForm
          key={address.id}
          addressId={address.id}
          address={address}
          defaultAddress={defaultAddress}
        >
          {({stateForMethod}) => (
            <div className="flex space-x-2 mt-4">
              <button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                disabled={stateForMethod('PUT') !== 'idle'}
                formMethod="PUT"
                type="submit"
              >
                {stateForMethod('PUT') !== 'idle' ? 'Saving...' : 'Save'}
              </button>
              <button
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70"
                disabled={stateForMethod('DELETE') !== 'idle'}
                formMethod="DELETE"
                type="submit"
              >
                {stateForMethod('DELETE') !== 'idle' ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </AddressForm>
      ))}
    </>
  );
}

export function AddressForm({
  addressId,
  address,
  defaultAddress,
  children,
}: {
  addressId: AddressFragment['id'];
  address: CustomerAddressInput;
  defaultAddress: CustomerFragment['defaultAddress'];
  children: (props: {
    stateForMethod: (method: 'PUT' | 'POST' | 'DELETE') => Fetcher['state'];
  }) => React.ReactNode;
}) {
  const {state, formMethod} = useNavigation();
  const action = useActionData<ActionResponse>();
  const error = action?.error?.[addressId];
  const isDefaultAddress = defaultAddress?.id === addressId;
  
  return (
    <Form id={addressId} className="space-y-4">
      <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
        <input type="hidden" name="addressId" defaultValue={addressId} />
        
        <div className="sm:col-span-2">
          <h3 className="text-lg font-medium text-gray-900">
            {addressId === 'NEW_ADDRESS_ID' ? 'New Address' : `Address #${addressId.slice(-6)}`}
          </h3>
          {isDefaultAddress && (
            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
              Default Address
            </span>
          )}
        </div>
        
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First name*
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="First name"
            autoComplete="given-name"
            defaultValue={address?.firstName ?? ''}
            id="firstName"
            name="firstName"
            placeholder="First name"
            required
            type="text"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last name*
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Last name"
            autoComplete="family-name"
            defaultValue={address?.lastName ?? ''}
            id="lastName"
            name="lastName"
            placeholder="Last name"
            required
            type="text"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Company"
            autoComplete="organization"
            defaultValue={address?.company ?? ''}
            id="company"
            name="company"
            placeholder="Company"
            type="text"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
            Address line 1*
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Address line 1"
            autoComplete="address-line1"
            defaultValue={address?.address1 ?? ''}
            id="address1"
            name="address1"
            placeholder="Address line 1*"
            required
            type="text"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
            Address line 2
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Address line 2"
            autoComplete="address-line2"
            defaultValue={address?.address2 ?? ''}
            id="address2"
            name="address2"
            placeholder="Address line 2"
            type="text"
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City*
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="City"
            autoComplete="address-level2"
            defaultValue={address?.city ?? ''}
            id="city"
            name="city"
            placeholder="City"
            required
            type="text"
          />
        </div>
        
        <div>
          <label htmlFor="zoneCode" className="block text-sm font-medium text-gray-700">
            State / Province*
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="State/Province"
            autoComplete="address-level1"
            defaultValue={address?.zoneCode ?? ''}
            id="zoneCode"
            name="zoneCode"
            placeholder="State / Province"
            required
            type="text"
          />
        </div>
        
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            Zip / Postal Code*
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Zip"
            autoComplete="postal-code"
            defaultValue={address?.zip ?? ''}
            id="zip"
            name="zip"
            placeholder="Zip / Postal Code"
            required
            type="text"
          />
        </div>
        
        <div>
          <label htmlFor="territoryCode" className="block text-sm font-medium text-gray-700">
            Country Code*
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="territoryCode"
            autoComplete="country"
            defaultValue={address?.territoryCode ?? ''}
            id="territoryCode"
            name="territoryCode"
            placeholder="Country"
            required
            type="text"
            maxLength={2}
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Phone Number"
            autoComplete="tel"
            defaultValue={address?.phoneNumber ?? ''}
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+16135551111"
            pattern="^\+?[1-9]\d{3,14}$"
            type="tel"
          />
        </div>
        
        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              defaultChecked={isDefaultAddress}
              id="defaultAddress"
              name="defaultAddress"
              type="checkbox"
            />
            <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
              Set as default address
            </label>
          </div>
        </div>
        
        {error && (
          <div className="sm:col-span-2">
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4">
        {children({
          stateForMethod: (method) => (formMethod === method ? state : 'idle'),
        })}
      </div>
    </Form>
  );
}