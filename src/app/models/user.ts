export class User {
    // Class contains:
    // id
    // firstName
    // lastName
    // username
    // userRole
    // getFullName()
    // toJsonString()

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _username: string;
    public get username(): string {
        return this._username;
    }
    public set username(v: string) {
        this._username = v;
    }

    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(v: string) {
        this._firstName = v;
    }

    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(v: string) {
        this._lastName = v;
    }

    private _userRole: number;
    public get userRole(): number {
        return this._userRole;
    }
    public set userRole(v: number) {
        this._userRole = v;
    }


    getFullName() {
        return '${firstName} ${lastName}';
    }

    toJsonString(): string {
        let json = JSON.stringify(this);
        Object.keys(this).filter(key => key[0] === '_').forEach(key => {
            json = json.replace(key, key.substring(1));
        });

        return json;
    }

}
