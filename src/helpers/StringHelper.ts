export function toTitleCase(text: string): string {
    return text.toLowerCase().replace(
        /\b\w/g,
        function(char) {
            return char.toUpperCase();
        },
    );
}
