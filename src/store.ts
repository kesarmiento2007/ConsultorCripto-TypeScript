import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency, Pair, CryptoPrice } from "./types";
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[],
    result: CryptoPrice,
    loading: boolean,
    fetchCryptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>
}

const cryptoPriceObject = {
    IMAGEURL: "",
    PRICE: "",
    HIGHDAY: "",
    LOWDAY: "",
    CHANGEPCT24HOUR: "",
    LASTUPDATE: ""
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: cryptoPriceObject,
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos();
        
        set(() => ({
            cryptocurrencies
        }));
    },
    fetchData: async (pair) => {
        set(() => ({
            result: cryptoPriceObject,
            loading: true
        }));

        const result = await fetchCurrentCryptoPrice(pair);
        
        set(() => ({
            result,
            loading: false
        }));
    }
})));