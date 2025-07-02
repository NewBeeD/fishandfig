import { useCurrency } from "~/lib/Context/CurrencyContext";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="mb-12">
      <label
        htmlFor="currency-selector"
        className="mr-2 font-medium text-xl tracking-widest"
      >
        Currency:
      </label>
      <select
        id="currency-selector"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border rounded p-1 text-xl"
      >
        <option value="USD">USD</option>
        <option value="XCD">XCD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </div>
  );
}
