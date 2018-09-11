export class User {
    kyc: {
        kyc_doc: string;
        kyc_selfie: string;
        kyc_status: number;
    };
    profile: {
        createdAt: string;
        email: string;
        name: string;
        twoFac: number;
        user_id: string;
    }
}
