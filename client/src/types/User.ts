export type LoggedUser = {
	id?: string;
	nickname?: string;
	lastClaimed?: number;
	nextClaim?: number;
	custodyAccountPrivateKey?: string;
	custodyAccountPublicKey?: string;
};


export type LoggingUser = {
    nickname:string,
    password:string,
}