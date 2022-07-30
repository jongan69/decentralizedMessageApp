import AsyncStorage from "@react-native-async-storage/async-storage";

export const SaveItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("saved data to async: ", key, value);
    } catch (e) {
      console.log(e);
    }
  };

export const ReadItem = async (key: string) => {
    try {
      var result = await AsyncStorage.getItem(key);
      return result;
    } catch (e) {
      return e;
    }
  };
  
  export function MultiRead(key: readonly string[], onResponse: (arg0: Map<any, any>) => void, onFailure: (arg0: unknown) => void) {
    try {
      AsyncStorage.multiGet(key).then((values) => {
        let responseMap = new Map();
        values.map((result, i, data) => {
          let key = data[i][0];
          let value = data[i][1];
          responseMap.set(key, value);
        });
        onResponse(responseMap);
      });
    } catch (error) {
      onFailure(error);
    }
  }
  
  export async function DeleteItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }