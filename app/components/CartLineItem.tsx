// import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
// import type {CartLayout} from '~/components/CartMain';
// import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
// import {useVariantUrl} from '~/lib/variants';
// import {Link} from 'react-router';
// import {ProductPrice} from './ProductPrice';
// import {useAside} from './Aside';
// import type {CartApiQueryFragment} from 'storefrontapi.generated';


// import { useCurrency } from '~/lib/Context/CurrencyContext';
// import { formatCurrency } from '~/lib/FormatCurrency';

// type CartLine = OptimisticCartLine<CartApiQueryFragment>;

// /**
//  * A single line item in the cart. It displays the product image, title, price.
//  * It also provides controls to update the quantity or remove the line item.
//  */
// export function CartLineItem({
//   layout,
//   line,
// }: {
//   layout: CartLayout;
//   line: CartLine;
// }) {
//   const {id, merchandise} = line;
//   const {product, title, image, selectedOptions} = merchandise;
//   const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
//   const {close} = useAside();


//   //  console.log('Product',line);

//   const {currency, exchangeRates} = useCurrency();

//   return (
//     <li key={id} className="cart-line">
//       {image && (
//         <Image
//           alt={title}
//           aspectRatio="1/1"
//           data={image}
//           height={100}
//           loading="lazy"
//           width={100}
//         />
//       )}

//       <div>
//         <Link
//           prefetch="intent"
//           to={lineItemUrl}
//           onClick={() => {
//             if (layout === 'aside') {
//               close();
//             }
//           }}
//         >
//           <p>
//             <strong className='text-2xl'>{product.title}</strong>
//           </p>
//         </Link>


//         {/* <ProductPrice price={line?.cost?.totalAmount} /> */}

//         <small className="text-lg tracking-widest">
//           {formatCurrency({
//             amount: parseFloat(line?.cost?.totalAmount?.amount ?? '0'),
//             currency,
//             exchangeRates,
//           })}
//         </small>




//         <ul>
//           {selectedOptions.map((option) => (
//             <li key={option.name}>
//               <small className='text-sm font-bold'>
//                 {option.name}: {option.value}
//               </small>
//             </li>
//           ))}
//         </ul>
//         <CartLineQuantity line={line} />
//       </div>
//     </li>
//   );
// }

// /**
//  * Provides the controls to update the quantity of a line item in the cart.
//  * These controls are disabled when the line item is new, and the server
//  * hasn't yet responded that it was successfully added to the cart.
//  */
// function CartLineQuantity({line}: {line: CartLine}) {
  
//   if (!line || typeof line?.quantity === 'undefined') return null;
//   const {id: lineId, quantity, isOptimistic} = line;
//   const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
//   const nextQuantity = Number((quantity + 1).toFixed(0));

//   return (
//     <div className="cart-line-quantity">
//       <small className='text-xl'>Quantity: {quantity} &nbsp;&nbsp;&nbsp;</small>
      
//       <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
//         <button
//           aria-label="Decrease quantity"
//           disabled={quantity <= 1 || !!isOptimistic}
//           name="decrease-quantity"
//           value={prevQuantity}
//           className='text-lg border-2 border-red-900 p-[5px]'
//         >
//           <span>&#8722; </span>
//         </button>
//       </CartLineUpdateButton>
//       &nbsp;
//       &nbsp;
      
//       <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
//         <button
//           aria-label="Increase quantity"
//           name="increase-quantity"
//           value={nextQuantity}
//           disabled={!!isOptimistic}
//           className='text-lg border-2 border-blue-900 p-[5px]'
//         >
//           <span>&#43;</span>
//         </button>
//       </CartLineUpdateButton>
//       &nbsp;
      
//       <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
//     </div>
//   );
// }

// /**
//  * A button that removes a line item from the cart. It is disabled
//  * when the line item is new, and the server hasn't yet responded
//  * that it was successfully added to the cart.
//  */
// function CartLineRemoveButton({
//   lineIds,
//   disabled,
// }: {
//   lineIds: string[];
//   disabled: boolean;
// }) {
//   return (
//     <CartForm
//       fetcherKey={getUpdateKey(lineIds)}
//       route="/cart"
//       action={CartForm.ACTIONS.LinesRemove}
//       inputs={{lineIds}}
//     >
//       <button disabled={disabled} type="submit">
//         Remove
//       </button>
//     </CartForm>
//   );
// }

// function CartLineUpdateButton({
//   children,
//   lines,
// }: {
//   children: React.ReactNode;
//   lines: CartLineUpdateInput[];
// }) {
//   const lineIds = lines.map((line) => line.id);

//   return (
//     <CartForm
//       fetcherKey={getUpdateKey(lineIds)}
//       route="/cart"
//       action={CartForm.ACTIONS.LinesUpdate}
//       inputs={{lines}}
//     >
//       {children}
//     </CartForm>
//   );
// }

// /**
//  * Returns a unique key for the update action. This is used to make sure actions modifying the same line
//  * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
//  * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
//  * @param lineIds - line ids affected by the update
//  * @returns
//  */
// function getUpdateKey(lineIds: string[]) {
//   return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
// }

import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {useAside} from './Aside';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import { useCurrency } from '~/lib/Context/CurrencyContext';
import { formatCurrency } from '~/lib/FormatCurrency';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const {currency, exchangeRates} = useCurrency();

  return (
    <li key={id} className="flex py-6">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
        {image && (
          <Image
            alt={title || product.title}
            data={image}
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => layout === 'aside' && close()}
            className="block"
          >
            <h3 className="text-2xl font-medium text-gray-900 line-clamp-1">
              {product.title}
            </h3>
          </Link>
          
          {title !== product.title && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{title}</p>
          )}
          
          {selectedOptions.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {selectedOptions.map(option => (
                <li key={option.name} className="flex text-xs">
                  <span className="text-gray-500">{option.name}:</span>
                  <span className="ml-1 text-gray-700">{option.value}</span>
                </li>
              ))}
            </ul>
          )}
          
          <div className="mt-2 text-xl tracking-wide font-medium">
            {formatCurrency({
              amount: parseFloat(line?.cost?.totalAmount?.amount ?? '0'),
              currency,
              exchangeRates,
            })}
          </div>
        </div>
        
        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="mt-3 flex flex-wrap items-center">
      <div className="flex items-center">
        <span className="mr-2 text-sm text-gray-600">Qty:</span>
        
        <div className="flex items-center border border-gray-300 rounded">
          <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1 || !!isOptimistic}
              className={`px-3 py-2 text-2xl ${
                quantity <= 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-black-900 hover:bg-gray-50'
              }`}
            >
              &minus;
            </button>
          </CartLineUpdateButton>
          
          <span className="px-3 py-2 text-lg text-black-900 border-x border-gray-300">
            {quantity}
          </span>
          
          <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              aria-label="Increase quantity"
              disabled={!!isOptimistic}
              className="px-3 py-2 text-2xl text-black-900 hover:bg-gray-50"
            >
              &#43;
            </button>
          </CartLineUpdateButton>
        </div>
        
      </div>
      
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

function CartLineRemoveButton({lineIds, disabled}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button 
        type="submit"
        disabled={disabled}
        className="ml-3 text-sm font-medium text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({children, lines}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map(line => line.id);
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

