import type { ChainListItem, ChainList } from "../hooks/useChain";

const selectChainTitle = "Cosmos Proposal Builder";
const selectChainDescription =
  "Select a chain or protocol to begin building a proposal.";

const ChainTiles = ({ chains }: { chains: ChainList }) => {
  return (
    <div className="w-full max-w-5xl px-2 py-2 sm:px-0 m-auto">
      <div className="flex flex-col min-w-full rounded-xl bg-white p-3">
        <div className="py-6 px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {selectChainTitle}
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">
              {selectChainDescription}
            </p>
          </div>
          <div className="mt-6 py-10 sm:divide-y sm:divide-gray-900/10 sm:border-t-2">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {chains.map(({ value, label, image }: ChainListItem) => (
                <li
                  key={value}
                  className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:bg-gray-50"
                >
                  <a href={`/${value}`} className="flex flex-1 flex-col p-8 ">
                    <img
                      className="mx-auto h-28 w-28 flex-shrink-0"
                      src={image}
                      alt={`${label} logo`}
                    />
                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                      <dt className="sr-only">Chain</dt>
                      <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">
                          {label}
                        </span>
                      </dd>
                    </dl>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ChainTiles };
