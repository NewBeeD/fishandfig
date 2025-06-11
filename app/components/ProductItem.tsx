import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    
    
    <Link
      className="product-item m-auto flex flex-col items-center"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <div className="xs:w-[90%] w-[80%]">
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        </div>
      )}
      <h4 className='text-3xl'>{product.title}</h4>
      <small className='text-lg tracking-widest'>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}
