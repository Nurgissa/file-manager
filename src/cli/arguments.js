export function extractUsername(args = []) {
    if (args.length < 3) {
        throw new Error("Error: Start file-manager as npm run start -- --username=<your_username>");
    }
    
    const [, value] = args[2].split("=");
    return value;
}