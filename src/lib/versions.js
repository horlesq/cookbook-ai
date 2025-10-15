import packageJson from "../../package.json";

export function getPackageVersions() {
    return {
        next: packageJson.dependencies?.next || "Not found",
        react: packageJson.dependencies?.react || "Not found",
        tailwindcss: packageJson.devDependencies?.tailwindcss || "Not found",
    };
}
