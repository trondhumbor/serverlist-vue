export function is_bot(player) {
    // Bots in CoD have a ping of 999
    return player?.test_client === 1 || player?.ping === 999;
}