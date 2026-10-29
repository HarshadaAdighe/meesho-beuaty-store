function ProductSkeleton() {
  return (
    <div className="skeleton-card">
      <h1 className="skeleton-name"></h1>
      <div className="image-skeleton" />

      <p className="skeleton-price"></p>
      <p className="skeleton-category"></p>
      <p className="skeleton-description"></p>
      <p className="skeleton-quantity"></p>
    </div>
  );
}

export default ProductSkeleton;
