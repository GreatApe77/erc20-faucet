
/**
 * @dev Tipo de dado para usuário
 */
export type TypeUser = {
    _id?: string;
    nickname?: string;
    password?: string;
    custodyAccountPublicKey?: string;
    custodyAccountPrivateKey?: string;
    lastClaimed?: number;
    nextClaim?: number;
}