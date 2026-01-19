export function cn(...classes) {
    // Filter out falsy values and join with space
    return classes.filter(Boolean).join(' ');
}