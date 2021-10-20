export const getLimit = (queryLimit?: string): number => {
    const limit = Number(queryLimit);
    return limit ? limit : 10;
};
