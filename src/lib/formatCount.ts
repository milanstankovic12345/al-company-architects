const NBSP = new RegExp(String.fromCharCode(160), "g");

/** Serbian (Latin) number formatting: "15.000", "0,72". */
export const formatCount = (n: number, decimals = 0) =>
  new Intl.NumberFormat("sr-Latn-RS", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  })
    .format(n)
    .replace(NBSP, "");
