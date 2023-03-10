import Address from "./address";

export default class Customer {

    private readonly _id: string;
    private _address!: Address;
    private _active: boolean = true;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    private _name: string = "";

    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get address(): Address {
        return this._address;
    }

    private _rewardPoints: number = 0;

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    validate() {

        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    isActive(): boolean {
        return this._active;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(address: Address) {
        this._address = address;
    }
}