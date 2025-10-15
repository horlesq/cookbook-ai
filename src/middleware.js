export const middleware = (request) => {
    // Basic middleware placeholder
    return NextResponse.next();
};

export const config = {
    matcher: ["/protected/:path*"], // Example protected route
};
