const TopBanner = () => {
  return (
    <div className="flex items-center justify-center bg-purple-dark px-6  sm:px-4.5">
      <p className="text-center text-xs leading-6 text-white">
        <a
          href="#"
          className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-2.5"
        >
          <strong>Free delivery on all orders over $50</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          <span className="hidden sm:inline">
            Until the end of 14th February {new Date().getFullYear()}
          </span>
          <span aria-hidden="true">&nbsp;&rarr;</span>
        </a>
      </p>
    </div>
  );
};

export default TopBanner;
