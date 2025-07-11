// import {Link, useLoaderData, type MetaFunction} from 'react-router';
// import {
//   Money,
//   getPaginationVariables,
//   flattenConnection,
// } from '@shopify/hydrogen';
// import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
// import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
// import type {
//   CustomerOrdersFragment,
//   OrderItemFragment,
// } from 'customer-accountapi.generated';
// import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

// export const meta: MetaFunction = () => {
//   return [{title: 'Orders'}];
// };

// export async function loader({request, context}: LoaderFunctionArgs) {
//   const paginationVariables = getPaginationVariables(request, {
//     pageBy: 20,
//   });

//   const {data, errors} = await context.customerAccount.query(
//     CUSTOMER_ORDERS_QUERY,
//     {
//       variables: {
//         ...paginationVariables,
//       },
//     },
//   );

//   if (errors?.length || !data?.customer) {
//     throw Error('Customer orders not found');
//   }

//   return {customer: data.customer};
// }

// export default function Orders() {
//   const {customer} = useLoaderData<{customer: CustomerOrdersFragment}>();
//   const {orders} = customer;
//   return (
//     <div className="orders">
//       {orders.nodes.length ? <OrdersTable orders={orders} /> : <EmptyOrders />}
//     </div>
//   );
// }

// function OrdersTable({orders}: Pick<CustomerOrdersFragment, 'orders'>) {
//   return (
//     <div className="acccount-orders">
//       {orders?.nodes.length ? (
//         <PaginatedResourceSection connection={orders}>
//           {({node: order}) => <OrderItem key={order.id} order={order} />}
//         </PaginatedResourceSection>
//       ) : (
//         <EmptyOrders />
//       )}
//     </div>
//   );
// }

// function EmptyOrders() {
//   return (
//     <div>
//       <p>You haven&apos;t placed any orders yet.</p>
//       <br />
//       <p>
//         <Link to="/collections">Start Shopping →</Link>
//       </p>
//     </div>
//   );
// }

// function OrderItem({order}: {order: OrderItemFragment}) {
//   const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
//   return (
//     <>
//       <fieldset>
//         <Link to={`/account/orders/${btoa(order.id)}`}>
//           <strong>#{order.number}</strong>
//         </Link>
//         <p>{new Date(order.processedAt).toDateString()}</p>
//         <p>{order.financialStatus}</p>
//         {fulfillmentStatus && <p>{fulfillmentStatus}</p>}
//         <Money data={order.totalPrice} />
//         <Link to={`/account/orders/${btoa(order.id)}`}>View Order →</Link>
//       </fieldset>
//       <br />
//     </>
//   );
// }



import {Link, useLoaderData, type MetaFunction} from 'react-router';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from 'customer-accountapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

export const meta: MetaFunction = () => {
  return [{title: 'Orders'}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_ORDERS_QUERY,
    {
      variables: {
        ...paginationVariables,
      },
    },
  );

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return {customer: data.customer};
}

export default function Orders() {
  const {customer} = useLoaderData<{customer: CustomerOrdersFragment}>();
  const {orders} = customer;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Orders</h1>
      {orders.nodes.length ? <OrdersTable orders={orders} /> : <EmptyOrders />}
    </div>
  );
}

function OrdersTable({orders}: Pick<CustomerOrdersFragment, 'orders'>) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {orders?.nodes.length ? (
        <PaginatedResourceSection 
          connection={orders}
          className="divide-y divide-gray-200"
        >
          {({node: order}) => <OrderItem key={order.id} order={order} />}
        </PaginatedResourceSection>
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="text-center py-12">
      <svg 
        className="mx-auto h-12 w-12 text-gray-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No orders</h3>
      <p className="mt-1 text-gray-500">
        You haven't placed any orders yet.
      </p>
      <div className="mt-6">
        <Link
          to="/collections/all"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

function OrderItem({order}: {order: OrderItemFragment}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  
  // Status badge styling
  const getStatusClass = (status: string) => {
    status = status.toLowerCase();
    if (status.includes('fulfilled')) return 'bg-green-100 text-green-800';
    if (status.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('cancelled')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-2 hover:bg-gray-50 transition-colors duration-150 border-2 border-grey-900 mt-3 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          
          <div className="flex items-center">
            <Link 
              to={`/account/orders/${btoa(order.id)}`}
              className="text-lg font-medium text-indigo-600 hover:text-indigo-500"
            >
              # {order.number}
            
            </Link>
            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">

              {order.fulfillmentStatus}
            </span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            {fulfillmentStatus && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(fulfillmentStatus)}`}>
                {fulfillmentStatus}
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.financialStatus)}`}>
              {order.financialStatus}
            </span>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {new Date(order.processedAt).toDateString()}
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center justify-center md:flex-col md:items-end gap-8">
          
          <div className="text-lg font-semibold text-gray-900">
            <Money data={order.totalPrice} />
          </div>
          
          <div className="mt-2 md:mt-3">
            <Link 
              to={`/account/orders/${btoa(order.id)}`}
              className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View details
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}