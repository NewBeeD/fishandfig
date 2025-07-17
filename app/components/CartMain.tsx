// import {useOptimisticCart} from '@shopify/hydrogen';
// import {Link} from 'react-router';
// import type {CartApiQueryFragment} from 'storefrontapi.generated';
// import {useAside} from '~/components/Aside';
// import {CartLineItem} from '~/components/CartLineItem';
// import {CartSummary} from './CartSummary';

// export type CartLayout = 'page' | 'aside';

// export type CartMainProps = {
//   cart: CartApiQueryFragment | null;
//   layout: CartLayout;
// };

// /**
//  * The main cart component that displays the cart items and summary.
//  * It is used by both the /cart route and the cart aside dialog.
//  */
// export function CartMain({layout, cart: originalCart}: CartMainProps) {
//   // The useOptimisticCart hook applies pending actions to the cart
//   // so the user immediately sees feedback when they modify the cart.
//   const cart = useOptimisticCart(originalCart);

//   const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
//   const withDiscount =
//     cart &&
//     Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
//   const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
//   const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

//   return (
//     <div className={className}>
//       <CartEmpty hidden={linesCount} layout={layout} />

//       <div className="cart-details">
//         <div aria-labelledby="cart-lines">
//           <ul>
//             {(cart?.lines?.nodes ?? []).map((line) => (
//               <CartLineItem key={line.id} line={line} layout={layout} />
//             ))}
//           </ul>
//         </div>
//         {cartHasItems && <CartSummary cart={cart} layout={layout} />}
//       </div>

//     </div>
//   );
// }

// function CartEmpty({
//   hidden = false,
// }: {
//   hidden: boolean;
//   layout?: CartMainProps['layout'];
// }) {
//   const {close} = useAside();
//   return (
//     <div hidden={hidden}>
//       <br />
//       <p>
//         Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
//         started!
//       </p>
//       <br />
//       <Link to="collections/all" onClick={close} prefetch="viewport">
//         Continue shopping →
//       </Link>
//     </div>
//   );
// }



import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

export function CartMain({layout, cart: originalCart}: CartMainProps) {
  const cart = useOptimisticCart(originalCart);
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount = cart && 
    Boolean(cart?.discountCodes?.filter(code => code.applicable)?.length);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={`${withDiscount ? 'with-discount' : ''}`}>
      <CartEmpty hidden={linesCount} layout={layout} />

      <div className="cart-details space-y-8">
        {cartHasItems && (
          <div aria-labelledby="cart-lines">
            <ul className="divide-y divide-gray-200">
              {(cart?.lines?.nodes ?? []).map(line => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
        )}
        
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({hidden = false, layout}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  return (
    <div 
      hidden={hidden} 
      className="text-center py-12"
    >
      <svg 
        className="mx-auto h-16 w-16 text-gray-400" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
      <p className="mt-1 text-gray-500 max-w-md mx-auto">
        Looks like you haven't added anything yet, let's get you started!
      </p>
      <div className="mt-6">
        <Link 
          to="collections/all" 
          onClick={close} 
          prefetch="viewport"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}