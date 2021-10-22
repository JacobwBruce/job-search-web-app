export const formatIsoDate = (isoDate: string): string => {
    var d = new Date(isoDate);
    return d.toLocaleDateString('en-US');
};
