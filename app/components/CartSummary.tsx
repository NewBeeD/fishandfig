import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useRef} from 'react';
import {FetcherWithComponents} from 'react-router';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';    

  return (
    <div aria-labelledby="cart-summary" className={className}>

      <h4 className='text-lg font-extrabold tracking-widest'>Totals</h4>
      <dl className="cart-subtotal">
        
        <dt className='text-lg font-bold'>Subtotal:&nbsp;&nbsp; </dt>
        
        <dd className='text-lg font-extrabold tracking-widest flex'>
          
          {cart.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost?.subtotalAmount} />
          ) : (
            '-'
          )}&nbsp;USD
        </dd>
      </dl>
      <CartDiscounts discountCodes={cart.discountCodes} />
      <CartGiftCard giftCardCodes={cart.appliedGiftCards} />
      {/* <CartCheckoutActions checkoutUrl={cart.checkoutUrl} /> */}
      <CartCheckoutActions
        checkoutUrl={cart.checkoutUrl}
        subtotal={parseFloat(cart.cost?.subtotalAmount?.amount || '0')}
      />

    </div>
  );
}



// function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
//   if (!checkoutUrl) return null;

//   return (
//     <div>
//       <a href={checkoutUrl} target="_self">
        
//         <p className='font-bold'>Continue to Checkout &rarr;</p>
//       </a>
//       <br />
//     </div>
//   );
// }

function CartCheckoutActions({
  checkoutUrl,
  subtotal,
}: {
  checkoutUrl?: string;
  subtotal: number;
}) {
  if (!checkoutUrl) return null;

  const MIN_ORDER = 9;
  const isBelowMinimum = subtotal < MIN_ORDER;

  const handleCheckout = () => {
    if (!isBelowMinimum && checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div className="mt-2 pb-2">
      {isBelowMinimum && (
        <p className="text-red-600 font-semibold mb-2">
          Minimum order amount is ${MIN_ORDER}. Please add more items to continue.
        </p>
      )}

      <button
        type="button"
        disabled={isBelowMinimum}
        onClick={handleCheckout}
        className={`w-full text-center px-4 py-2 rounded font-bold transition ${
          isBelowMinimum
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-amber-600 text-white hover:bg-amber-700'
        }`}
      >
        Continue to Checkout &rarr;
      </button>
    </div>
  );
}



function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <input type="text" name="discountCode" placeholder="Discount code" />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const codes: string[] =
    giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    giftCardCodeInput.current!.value = '';
  }

  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }

  return (
    <div>
      {/* Have existing gift card applied, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Applied Gift Card(s)</dt>
          <UpdateGiftCardForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button onSubmit={() => removeAppliedCode}>Remove</button>
            </div>
          </UpdateGiftCardForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
      >
        <div>
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
          />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  removeAppliedCode?: () => void;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}
