

export interface CurrentUser {
    email?: string;
    role?: number;
}
const STORAGE_KEY = 'currentUser';

export class CurrentUserProfileModel {
    email?: string;
    role?: number;
    constructor() {
        let stored = sessionStorage.getItem(STORAGE_KEY);
        console.log(stored);

        if (stored) {
            stored = atob(stored);
            const userProfile = JSON.parse(decodeURIComponent(escape(stored)));
            Object.assign(this, userProfile);
        }
    }
    // tslint:disable-next-line:typedef
    toJSON() {
        return JSON.stringify({
            email: this.email,
            role: this.role,
        });
    }

    public save(currentUser: CurrentUser): void {
        Object.assign(this, currentUser);
        this.saveToSession();
    }

    private saveToSession(): void {
        sessionStorage.setItem(STORAGE_KEY, btoa(unescape(encodeURIComponent(this.toJSON()))));
    }

    destroy(): void {
        sessionStorage.removeItem(STORAGE_KEY);
        this.email = undefined;
        this.role = undefined;
    }

    isBase64(str): boolean {
        if (str === '' || str.trim() === '') { return false; }
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    }
}

