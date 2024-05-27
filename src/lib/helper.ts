export function isMatch<T>(a: T, b: T){
    return a === b;
};

export function isEmpty(a: string){
    return a.trim().length === 0;
};

export const public_routes = ["/verify-email", "/password-forgot", "/password-reset"];

export const auth_routes = [
    "/signin", "/signup"
];

export const api_route = "/api/auth";