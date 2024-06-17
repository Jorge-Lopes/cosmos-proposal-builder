// This is generated by writeCoreProposal; please edit!
/* eslint-disable */

const manifestBundleRef = {
  bundleID:
    "b1-5192e186928390aee498b1c43ce4f3d9e36af52f894ef6319b2e04fafd5588736b9dba6d6a4f30ad16e6e864304f33d5040499d09a5f17f3297bd5a3e4295784",
};
const getManifestCall = harden([
  "getManifestForPriceFeed",
  {
    AGORIC_INSTANCE_NAME: "STARS-USD price feed",
    IN_BRAND_DECIMALS: 6,
    IN_BRAND_LOOKUP: ["agoricNames", "oracleBrand", "STARS"],
    IN_BRAND_NAME: "STARS",
    OUT_BRAND_DECIMALS: 4,
    OUT_BRAND_LOOKUP: ["agoricNames", "oracleBrand", "USD"],
    OUT_BRAND_NAME: "USD",
    brandInRef: undefined,
    brandOutRef: undefined,
    contractTerms: {
      POLL_INTERVAL: 30n,
      maxSubmissionCount: 1000,
      maxSubmissionValue:
        115792089237316195423570985008687907853269984665640564039457584007913129639936n,
      minSubmissionCount: 2,
      minSubmissionValue: 1n,
      restartDelay: 1,
      timeout: 10,
    },
    oracleAddresses: [
      "agoric10vjkvkmpp9e356xeh6qqlhrny2htyzp8hf88fk",
      "agoric1lw4e4aas9q84tq0q92j85rwjjjapf8dmnllnft",
      "agoric1qj07c7vfk3knqdral0sej7fa6eavkdn8vd8etf",
      "agoric1ra0g6crtsy6r3qnpu7ruvm7qd4wjnznyzg5nu4",
      "agoric1zj6vrrrjq4gsyr9lw7dplv4vyejg3p8j2urm82",
      "agoric1ldmtatp24qlllgxmrsjzcpe20fvlkp448zcuce",
      "agoric140dmkrz2e42ergjj7gyvejhzmjzurvqeq82ang",
      "agoric1w8wktaur4zf8qmmtn3n7x3r0jhsjkjntcm3u6h",
    ],
    priceAggregatorRef: {
      bundleID:
        "b1-4efd31d2e91dd6340d31a80aea1b1918f99e9f05f2ba9e5b9bb96711f1a470b0ad7eca202fbf63dad2c4761640ebc0b2de9caffa79349fd64e7dde8d3bc0e022",
    },
  },
]);
const customManifest = {
  createPriceFeed: {
    consume: {
      agoricNamesAdmin: "priceFeed",
      board: "priceFeed",
      chainStorage: "priceFeed",
      chainTimerService: "priceFeed",
      client: "priceFeed",
      contractGovernor: "priceFeed",
      econCharterKit: "priceFeed",
      economicCommitteeCreatorFacet: "priceFeed",
      highPrioritySendersManager: "priceFeed",
      namesByAddressAdmin: "priceFeed",
      priceAuthority: "priceFeed",
      priceAuthorityAdmin: "priceFeed",
      startGovernedUpgradable: "priceFeed",
    },
  },
  ensureOracleBrands: {
    namedVat: {
      consume: {
        agoricNames: "agoricNames",
      },
    },
    oracleBrand: {
      produce: "priceFeed",
    },
  },
};

// Make a behavior function and "export" it by way of script completion value.
// It is constructed by an anonymous invocation to ensure the absence of a global binding
// for makeCoreProposalBehavior, which may not be necessary but preserves behavior pre-dating
// https://github.com/Agoric/agoric-sdk/pull/8712 .
const behavior = (({
  manifestBundleRef,
  getManifestCall: [manifestGetterName, ...manifestGetterArgs],
  customManifest,
  E,
  log = console.info,
  customRestoreRef,
}) => {
  const { entries, fromEntries } = Object;

  // deeplyFulfilled is a bit overkill for what we need.
  const shallowlyFulfilled = async (obj) => {
    if (!obj) {
      return obj;
    }
    const ents = await Promise.all(
      entries(obj).map(async ([key, valueP]) => {
        const value = await valueP;
        return [key, value];
      })
    );
    return fromEntries(ents);
  };

  const makeRestoreRef = (vatAdminSvc, zoe) => {
    /** @type {(ref: import\('./externalTypes.js').ManifestBundleRef) => Promise<Installation<unknown>>} */
    const defaultRestoreRef = async (bundleRef) => {
      // extract-proposal.js creates these records, and bundleName is
      // the optional name under which the bundle was installed into
      // config.bundles
      const bundleIdP =
        "bundleName" in bundleRef
          ? E(vatAdminSvc).getBundleIDByName(bundleRef.bundleName)
          : bundleRef.bundleID;
      const bundleID = await bundleIdP;
      const label = bundleID.slice(0, 8);
      return E(zoe).installBundleID(bundleID, label);
    };
    return defaultRestoreRef;
  };

  /** @param {ChainBootstrapSpace & BootstrapPowers & { evaluateBundleCap: any }} powers */
  const coreProposalBehavior = async (powers) => {
    // NOTE: `powers` is expected to match or be a superset of the above `permits` export,
    // which should therefore be kept in sync with this deconstruction code.
    // HOWEVER, do note that this function is invoked with at least the *union* of powers
    // required by individual moduleBehaviors declared by the manifest getter, which is
    // necessary so it can use `runModuleBehaviors` to provide the appropriate subset to
    // each one (see ./writeCoreProposal.js).
    // Handle `powers` with the requisite care.
    const {
      consume: { vatAdminSvc, zoe, agoricNamesAdmin },
      evaluateBundleCap,
      installation: { produce: produceInstallations },
      modules: {
        utils: { runModuleBehaviors },
      },
    } = powers;

    // Get the on-chain installation containing the manifest and behaviors.
    log("evaluateBundleCap", {
      manifestBundleRef,
      manifestGetterName,
      vatAdminSvc,
    });
    let bcapP;
    if ("bundleName" in manifestBundleRef) {
      bcapP = E(vatAdminSvc).getNamedBundleCap(manifestBundleRef.bundleName);
    } else if ("bundleID" in manifestBundleRef) {
      bcapP = E(vatAdminSvc).getBundleCap(manifestBundleRef.bundleID);
    } else {
      const keys = Reflect.ownKeys(manifestBundleRef).map((key) =>
        typeof key === "string" ? JSON.stringify(key) : String(key)
      );
      const keysStr = '[' + keys.join(", ") + ']';
      throw Error(
        'bundleRef must have own bundleName or bundleID, missing in ' + keysStr
      );
    }
    const bundleCap = await bcapP;

    const proposalNS = await evaluateBundleCap(bundleCap);

    // Get the manifest and its metadata.
    log("execute", {
      manifestGetterName,
      bundleExports: Object.keys(proposalNS),
    });
    const restoreRef = customRestoreRef || makeRestoreRef(vatAdminSvc, zoe);
    const {
      manifest,
      options: rawOptions,
      installations: rawInstallations,
    } = await proposalNS[manifestGetterName](
      harden({ restoreRef }),
      ...manifestGetterArgs
    );

    // Await references in the options or installations.
    const [options, installations] = await Promise.all(
      [rawOptions, rawInstallations].map(shallowlyFulfilled)
    );

    // Publish the installations for our dependencies.
    const installationEntries = entries(installations || {});
    if (installationEntries.length > 0) {
      const installAdmin = E(agoricNamesAdmin).lookupAdmin("installation");
      await Promise.all(
        installationEntries.map(([key, value]) => {
          produceInstallations[key].resolve(value);
          return E(installAdmin).update(key, value);
        })
      );
    }

    // Evaluate the manifest.
    return runModuleBehaviors({
      // Remember that `powers` may be arbitrarily broad.
      allPowers: powers,
      behaviors: proposalNS,
      manifest: customManifest || manifest,
      makeConfig: (name, _permit) => {
        log("coreProposal:", name);
        return { options };
      },
    });
  };

  return coreProposalBehavior;
})({ manifestBundleRef, getManifestCall, customManifest, E });
behavior;
