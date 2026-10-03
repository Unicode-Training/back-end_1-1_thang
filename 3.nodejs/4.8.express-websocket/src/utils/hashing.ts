import bcypt from "bcrypt";
export class Hash {
    static SALT_ROUNDS = 12;
    static make(password: string) {
        return bcypt.hashSync(password, this.SALT_ROUNDS);
    }
    static verify(hashPassword: string, password: string) {
        return bcypt.compareSync(password, hashPassword);
    }
}