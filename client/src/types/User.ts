export type LoggedUser = {
	id?: string;
	nickname?: string;
	lastClaimed?: number;
	nextClaim?: number;
	tokenBalance?: bigint;
	custodyAccountPrivateKey?: string;
	custodyAccountPublicKey?: string;
};


export type LoggingUser = {
    nickname:string,
    password:string,
}