import { readFileSync } from "fs";
import { createRequire } from "module";
import { generateFromTemplate } from "./generateFromTemplate";
import {
  EMERYNET_ORACLE_OPERATORS,
  MAINNET_ORACLE_OPERATORS,
} from "./addVault/constants";

const nodeRequire = createRequire(import.meta.url);
const resolveAsString = (path: string) =>
  readFileSync(nodeRequire.resolve(path), "utf8");

describe("proposal builders - generateFromTemplate", () => {
  it("should generate code from addPsm template", () => {
    const values: AddPSMParams = {
      decimalPlaces: 6,
      keyword: "USDC",
      proposedName: "USDC",
      denom:
        "ibc/FE98AAD68F02F03565E9FA39A5E627946699B2B07115889ED812D8BA639576A9",
    };
    const template = resolveAsString("./addPSM/gov-start-psm.js");
    const expectedCode = resolveAsString(
      "./__fixtures__/gov-start-usdc-psm.js",
    );
    const generatedCode = generateFromTemplate<AddPSMParams>(template, values);
    expect(generatedCode).toEqual(expectedCode);
  });

  it("should generate code from addVault template", () => {
    const values: AddVaultParams = {
      decimalPlaces: 6,
      denom:
        "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4",
      keyword: "STARS",
      issuerName: "STARS",
      proposedName: "STARS",
      oracleBrand: "STARS",
      oracleAddresses: MAINNET_ORACLE_OPERATORS,
    };
    const [vaultTemplate, oracleTemplate] = [
      resolveAsString("./addVault/add-vault.js"),
      resolveAsString("./addVault/add-oracle.js"),
    ];
    const [expectedVault, expectedOracle] = [
      resolveAsString("./__fixtures__/add-STARS.js"),
      resolveAsString("./__fixtures__/add-STARS-oracles.js"),
    ];
    const [generatedVault, generatedOracle] = [
      generateFromTemplate<AddVaultParams>(vaultTemplate, values),
      generateFromTemplate<AddVaultParams>(oracleTemplate, values),
    ];
    expect(generatedVault).toEqual(expectedVault);
    expect(generatedOracle).toEqual(expectedOracle);
  });

  it("should generate code from addVault emerynet template", () => {
    const values: AddVaultParams = {
      decimalPlaces: 6,
      denom:
        "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4",
      keyword: "STARS",
      issuerName: "STARS",
      proposedName: "STARS",
      oracleBrand: "STARS",
      oracleAddresses: EMERYNET_ORACLE_OPERATORS,
    };
    const [vaultTemplate, oracleTemplate] = [
      resolveAsString("./addVault/add-vault.js"),
      resolveAsString("./addVault/add-oracle.js"),
    ];
    const [expectedVault, expectedOracle] = [
      resolveAsString("./__fixtures__/add-STARS.js"),
      resolveAsString("./__fixtures__/add-STARS-oracles-emerynet.js"),
    ];
    const [generatedVault, generatedOracle] = [
      generateFromTemplate<AddVaultParams>(vaultTemplate, values),
      generateFromTemplate<AddVaultParams>(oracleTemplate, values),
    ];
    expect(generatedVault).toEqual(expectedVault);
    expect(generatedOracle).toEqual(expectedOracle);
  });
});
