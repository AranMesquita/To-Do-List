import AsyncStorage from '@react-native-async-storage/async-storage';

const Save_tasks = async (task) => {
     // AsyncStorage only stores data as a string, thus new data has to be overlayed over the old data
     try {
        const Tasks = await AsyncStorage.getItem('Tasks');
        if(!Tasks || Tasks == 'No_Tasks'){
            const first_array = new Array(task);
            await AsyncStorage.setItem('Tasks', JSON.stringify(first_array));
            return;
        }else if(Tasks !== 'No_Tasks'){
          const jsonData = JSON.parse(Tasks);
          const List = [...jsonData, task];
          await AsyncStorage.setItem('Tasks', JSON.stringify(List));
          return;   
        }
      } catch (error) {
        console.log(`Error with Save_tasks async func. in AsyncStorage.js:\n${error}`);
      }
}

const Retrieve_tasks = async () => {
    // Retrieve_tasks async func. returns all the tasks saved to AsyncStorage @ the key: "Tasks"
    try{
        const Tasks = await AsyncStorage.getItem('Tasks');
        if (Tasks === null || Tasks === '["This is new task"]'){
            await AsyncStorage.setItem('Tasks', 'No_Tasks');
            return 'No_Tasks';
        }else if(Tasks == 'No_Tasks'){
          return 'No_Tasks';
        }else{
          const jsonData = JSON.parse(Tasks);
          return jsonData;
        }
      }catch(error){
        console.log(`Error with Retrieve_tasks async func. in AsyncStorage.js:\n${error}`);
      }
}

const Delete_task = async (taskItems, index) =>{
    // Delete_task async func. deletes a task from the TaskItems array using splice module and the index of the task that needs to be deleted
    try{
      if(taskItems.length == 1){
        await AsyncStorage.setItem('Tasks', 'No_Tasks');
        return;
      }
      let new_Tasks_array = [...taskItems.slice(0, index), ...taskItems.slice(index + 1)];
      await AsyncStorage.setItem('Tasks', JSON.stringify(new_Tasks_array));
      return;
    }catch(error){
        console.log(`Error with Delete_task func. in AsyncStorage.js:\n${error}`);
    }
}

export {Save_tasks, Retrieve_tasks, Delete_task};