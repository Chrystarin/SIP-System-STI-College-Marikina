export default function isDefined<T>(data: T, error: Error): asserts data is NonNullable<T> {
    if(data === null || data === undefined) throw error;
}