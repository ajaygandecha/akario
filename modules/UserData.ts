import Coordinate from "./Coordinate";

export type UserData = { [key: number]: Coordinate[] };

const LOCAL_STORAGE_USER_DATA_KEY = "akari_userData";

export default class UserDataManager {

    static getUserData(): UserData {
        
        try {

            const storageData = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);

            if(storageData != null) {
                let userData = JSON.parse(storageData) as UserData;
                console.log(userData);
                return userData;
            } 
            else {
                console.log("No user data found to load.");
                return {};
            }
        }
        catch {
            console.log("Error loading data.");
            return {};
        }
    }

    static updateUserData(newData: UserData) {
        
        if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(newData));
        }
    }

    static getDataForPuzzle(id: number): Coordinate[] {
        let userData = this.getUserData();
        if(id in userData) {

            let coordList: Coordinate[] = [];

            userData[id].forEach((c) => coordList.push(new Coordinate(c.r, c.c)));

            return coordList;
        }
        else {
            return [];
        }
    }

    static setDataForPuzzle(id: number, data: Coordinate[]) {
        
        let userData = this.getUserData();

        console.log(userData);
        
        userData[id] = data;
        this.updateUserData(userData);
    }
}