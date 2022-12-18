import Coordinate from "./Coordinate";

/** Type alias for user data stored in localStorage. */
export type UserData = { [key: number]: Coordinate[] };

/** Key for the local storage of user data. */
const LOCAL_STORAGE_USER_DATA_KEY = "akari_userData";

/** Helper class to manage user data. */
export default class UserDataManager {

    /**
    * Get user data.
    * @returns user data from `localStorage`.
    */
    static getUserData(): UserData {

        // Try to load and return user data.
        try {

            // Get the data from `localStorage`.
            const storageData = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);

            // Check if data was found.
            if (storageData != null) {
                // Parse the data (JSON) as a `UserData` type.
                let userData = JSON.parse(storageData) as UserData;
                // Return the parsed data.
                return userData;
            }
            // If no data was found...
            else {
                // Log error in console.
                console.log("No user data found to load.");
                // Return an empty object for the user data.
                return {};
            }
        }
        // If an error occurs...
        catch {
            // Log error in the console.
            console.log("Error loading data.");
            // Return an empty object for the user data.
            return {};
        }
    }

    /**
     * Update the user data in `localStorage`.
     * @param newData - New data to store.
     */
    static updateUserData(newData: UserData) {

        // Check if the local storage can be accessed.
        if (typeof window !== "undefined") {
            // Set the new data in `localStorage`.
            localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(newData));
        }
    }

    /**
     * Get the user data for a particular puzzle.
     * @param id - ID of the puzzle to find data for.
     * @returns user data for the puzzle.
     */
    static getDataForPuzzle(id: number): Coordinate[] {

        // Get the user data from `localStorage`.
        let userData = this.getUserData();

        // Check if the user has any data stored for the puzzle.
        if (id in userData) {
            // Create an empty coordinate list.
            let coordList: Coordinate[] = [];
            // Add all coordinates from the user data into the list.
            userData[id].forEach((c) => coordList.push(new Coordinate(c.r, c.c)));
            // Return the list.
            return coordList;
        }
        // If no data found...
        else {
            // Return an empty coordinate list.
            return [];
        }
    }

    /**
     * Set the user data for a particular puzzle.
     * @param id - ID of the puzzle to set data for.
     * @param data new user data for the puzzle. 
     */
    static setDataForPuzzle(id: number, data: Coordinate[]) {

        // Get the user data from `localStorage`.
        let userData = this.getUserData();
        // Set the new data for the puzzle ID.
        userData[id] = data;
        // Update the user data with the new puzzle progress.
        this.updateUserData(userData);
    }

    /**
     * Gets the user data for a particular puzzle from an existing userData instance.
     * @param userData - User data to search for.
     * @param id - ID of the puzzle to set data for.
     * @returns the data for the particular puzzle.
     */
    static getDataForPuzzleFromUserData(userData: UserData, id: number): Coordinate[] {

        // Check if the user has any data stored for the puzzle.
        if (id in userData) {
            // Create an empty coordinate list.
            let coordList: Coordinate[] = [];
            // Add all coordinates from the user data into the list.
            userData[id].forEach((c) => coordList.push(new Coordinate(c.r, c.c)));
            // Return the list.
            return coordList;
        }
        // If no data found...
        else {
            // Return an empty coordinate list.
            return [];
        }
    }
}