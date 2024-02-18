export function remove_color_codes(name) {
    return name?.replace(/\^[\d:;]/g, "");
}