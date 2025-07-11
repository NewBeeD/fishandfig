// import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
// import {useLoaderData, type MetaFunction} from 'react-router';
// import {Money, Image, flattenConnection} from '@shopify/hydrogen';
// import type {OrderLineItemFullFragment} from 'customer-accountapi.generated';
// import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';

// export const meta: MetaFunction<typeof loader> = ({data}) => {
//   return [{title: `Order ${data?.order?.name}`}];
// };

// export async function loader({params, context}: LoaderFunctionArgs) {
//   if (!params.id) {
//     return redirect('/account/orders');
//   }

//   const orderId = atob(params.id);
//   const {data, errors} = await context.customerAccount.query(
//     CUSTOMER_ORDER_QUERY,
//     {
//       variables: {orderId},
//     },
//   );

//   if (errors?.length || !data?.order) {
//     throw new Error('Order not found');
//   }

//   const {order} = data;

//   const lineItems = flattenConnection(order.lineItems);
//   const discountApplications = flattenConnection(order.discountApplications);

//   const fulfillmentStatus =
//     flattenConnection(order.fulfillments)[0]?.status ?? 'N/A';

//   const firstDiscount = discountApplications[0]?.value;

//   const discountValue =
//     firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

//   const discountPercentage =
//     firstDiscount?.__typename === 'PricingPercentageValue' &&
//     firstDiscount?.percentage;

//   return {
//     order,
//     lineItems,
//     discountValue,
//     discountPercentage,
//     fulfillmentStatus,
//   };
// }

// export default function OrderRoute() {
//   const {
//     order,
//     lineItems,
//     discountValue,
//     discountPercentage,
//     fulfillmentStatus,
//   } = useLoaderData<typeof loader>();
//   return (
//     <div className="account-order">
//       <h2>Order {order.name}</h2>
//       <p>Placed on {new Date(order.processedAt!).toDateString()}</p>
//       <br />
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th scope="col">Product</th>
//               <th scope="col">Price</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {lineItems.map((lineItem, lineItemIndex) => (
//               // eslint-disable-next-line react/no-array-index-key
//               <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
//             ))}
//           </tbody>
//           <tfoot>
//             {((discountValue && discountValue.amount) ||
//               discountPercentage) && (
//               <tr>
//                 <th scope="row" colSpan={3}>
//                   <p>Discounts</p>
//                 </th>
//                 <th scope="row">
//                   <p>Discounts</p>
//                 </th>
//                 <td>
//                   {discountPercentage ? (
//                     <span>-{discountPercentage}% OFF</span>
//                   ) : (
//                     discountValue && <Money data={discountValue!} />
//                   )}
//                 </td>
//               </tr>
//             )}
//             <tr>
//               <th scope="row" colSpan={3}>
//                 <p>Subtotal</p>
//               </th>
//               <th scope="row">
//                 <p>Subtotal</p>
//               </th>
//               <td>
//                 <Money data={order.subtotal!} />
//               </td>
//             </tr>
//             <tr>
//               <th scope="row" colSpan={3}>
//                 Tax
//               </th>
//               <th scope="row">
//                 <p>Tax</p>
//               </th>
//               <td>
//                 <Money data={order.totalTax!} />
//               </td>
//             </tr>
//             <tr>
//               <th scope="row" colSpan={3}>
//                 Total
//               </th>
//               <th scope="row">
//                 <p>Total</p>
//               </th>
//               <td>
//                 <Money data={order.totalPrice!} />
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//         <div>
//           <h3>Shipping Address</h3>
//           {order?.shippingAddress ? (
//             <address>
//               <p>{order.shippingAddress.name}</p>
//               {order.shippingAddress.formatted ? (
//                 <p>{order.shippingAddress.formatted}</p>
//               ) : (
//                 ''
//               )}
//               {order.shippingAddress.formattedArea ? (
//                 <p>{order.shippingAddress.formattedArea}</p>
//               ) : (
//                 ''
//               )}
//             </address>
//           ) : (
//             <p>No shipping address defined</p>
//           )}
//           <h3>Status</h3>
//           <div>
//             <p>{fulfillmentStatus}</p>
//           </div>
//         </div>
//       </div>
//       <br />
//       <p>
//         <a target="_blank" href={order.statusPageUrl} rel="noreferrer">
//           View Order Status →
//         </a>
//       </p>
//     </div>
//   );
// }

// function OrderLineRow({lineItem}: {lineItem: OrderLineItemFullFragment}) {
//   return (
//     <tr key={lineItem.id}>
//       <td>
//         <div>
//           {lineItem?.image && (
//             <div>
//               <Image data={lineItem.image} width={96} height={96} />
//             </div>
//           )}
//           <div>
//             <p>{lineItem.title}</p>
//             <small>{lineItem.variantTitle}</small>
//           </div>
//         </div>
//       </td>
//       <td>
//         <Money data={lineItem.price!} />
//       </td>
//       <td>{lineItem.quantity}</td>
//       <td>
//         <Money data={lineItem.totalDiscount!} />
//       </td>
//     </tr>
//   );
// }


import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from 'react-router';
import {Money, Image, flattenConnection} from '@shopify/hydrogen';
import type {OrderLineItemFullFragment} from 'customer-accountapi.generated';
import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Order ${data?.order?.name || ''}`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_ORDER_QUERY,
    {
      variables: {orderId},
    },
  );

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const {order} = data;

  const lineItems = flattenConnection(order.lineItems);
  const discountApplications = flattenConnection(order.discountApplications);

  const fulfillmentStatus =
    flattenConnection(order.fulfillments)[0]?.status ?? 'N/A';

  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' &&
    firstDiscount?.percentage;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>();
  
  // Get status color based on fulfillment status
  const getStatusColor = (status: string) => {
    status = status.toLowerCase();
    if (status.includes('fulfilled')) return 'bg-green-100 text-green-800';
    if (status.includes('processing')) return 'bg-blue-100 text-blue-800';
    if (status.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('failed')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Order Header */}
        <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Order {order?.name || ''}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Placed on {order?.processedAt ? new Date(order.processedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'N/A'}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(fulfillmentStatus)}`}>
                {fulfillmentStatus}
              </span>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="px-6 py-5">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {lineItems.map((lineItem, lineItemIndex) => (
                <OrderLineRow key={lineItemIndex} lineItem={lineItem} />
              ))}
            </ul>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-gray-50 px-6 py-5 border-t border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <Money data={order.subtotal!} />
              </dd>
            </div>
            
            {(discountValue?.amount || discountPercentage) && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Discounts</dt>
                <dd className="mt-1 text-sm text-red-600">
                  {discountPercentage ? (
                    <span>-{discountPercentage}% OFF</span>
                  ) : (
                    discountValue && <Money data={discountValue} />
                  )}
                </dd>
              </div>
            )}
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Tax</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {order.totalTax?.amount ? (
                  <Money data={order.totalTax} />
                ) : (
                  <span>N/A</span>
                )}
              </dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Shipping</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {order.totalShipping?.amount ? (
                  <Money data={order.totalShipping} />
                ) : (
                  <span>Free</span>
                )}
              </dd>
            </div>
            
            <div className="pt-4 sm:col-span-2 border-t border-gray-200">
              <dt className="text-base font-medium text-gray-900">Total</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">
                <Money data={order.totalPrice!} />
              </dd>
            </div>
          </dl>
        </div>
        
        {/* Shipping and Status */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
              {order?.shippingAddress ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <address className="not-italic">
                    {order.shippingAddress.name && (
                      <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                    )}
                    {order.shippingAddress.formatted && (
                      <p className="mt-2 text-gray-600">{order.shippingAddress.formatted}</p>
                    )}
                    {order.shippingAddress.formattedArea && (
                      <p className="mt-1 text-gray-600">{order.shippingAddress.formattedArea}</p>
                    )}
                    {order.shippingAddress.phone && (
                      <p className="mt-1 text-gray-600">Phone: {order.shippingAddress.phone}</p>
                    )}
                  </address>
                </div>
              ) : (
                <p className="text-gray-500">No shipping address provided</p>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {order?.paymentTransactions?.length ? (
                  <>
                    <p className="font-medium text-gray-900">
                      {order.paymentTransactions[0]?.paymentDetails?.creditCard?.brand || 'Credit Card'}
                    </p>
                    {order.paymentTransactions[0]?.paymentDetails?.creditCard?.lastDigits ? (
                      <p className="mt-1 text-gray-600">
                        Ending with {order.paymentTransactions[0]?.paymentDetails?.creditCard?.lastDigits}
                      </p>
                    ) : null}
                    {order.financialStatus ? (
                      <p className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.financialStatus.toLowerCase() === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.financialStatus}
                        </span>
                      </p>
                    ) : null}
                  </>
                ) : (
                  <p className="text-gray-500">Payment information not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Status Link */}
        {order?.statusPageUrl && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <a 
              target="_blank" 
              href={order.statusPageUrl} 
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Order Status
              <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderLineRow({lineItem}: {lineItem: OrderLineItemFullFragment}) {
  return (
    <li className="py-4">
      <div className="flex items-center">
        {lineItem?.image?.url && (
          <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
            <Image 
              data={lineItem.image} 
              width={80} 
              height={80} 
              className="w-full h-full object-cover object-center"
              alt={lineItem.title || 'Product image'}
            />
          </div>
        )}
        
        <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              {lineItem.title || 'Unnamed product'}
            </h4>
            {lineItem.variantTitle && (
              <p className="mt-1 text-sm text-gray-500">{lineItem.variantTitle}</p>
            )}
            {lineItem.sku && (
              <p className="mt-1 text-xs text-gray-400">SKU: {lineItem.sku}</p>
            )}
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-6">
            <dl className="flex sm:block space-x-6 sm:space-x-0 sm:space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Price</dt>
                <dd className="ml-4 sm:ml-0 text-gray-700">
                  {lineItem.price?.amount ? (
                    <Money data={lineItem.price} />
                  ) : (
                    <span>N/A</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Qty</dt>
                <dd className="ml-4 sm:ml-0 text-gray-700">{lineItem.quantity || 1}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="ml-4 sm:ml-0 text-gray-900">
                  {lineItem.totalPrice?.amount ? (
                    <Money data={lineItem.totalPrice} />
                  ) : (
                    <span>N/A</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </li>
  );
}