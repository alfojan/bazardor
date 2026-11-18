
export function toBanglaNumber(value: number): string {
    return new Intl.NumberFormat("bn-BD").format(value);
}

export function formatPrice(price: number): string {
    return `${toBanglaNumber(price)} টাকা`;
}

export function formatPercentage(value: number): string {
    const sign = value > 0 ? "+" : "";
    return `${sign}${toBanglaNumber(value)}%`;
}
