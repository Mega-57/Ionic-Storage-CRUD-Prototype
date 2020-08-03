import { Injectable } from '@angular/core';

export interface Item{
  id: number,
  type: string,
  value: number,
  modified: number
}

const itemKey = 'my-Item';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
//create
  addItem(item: Item): Promise<any> {
return this.storage.get(itemKey).then((items: Item[])=>{

if (items) {
  items.push(item);
  return this.storage.set(itemKey, [item]);
} else {
  return this.storage.set(itemKey, [item]);
}

});
  }

//read
  getItems(): Promise<Item[]> {
return this.storage.get(itemKey);
  }

//update
  updateItem(item: Item): Promise<any> {
    return this.storage.get(itemKey).then((items: Item[])=>{

    if(!items || items.length == 0) {
      return null;
    }

    let newItems: Item[] = [];

      for (let i of items) {
        if (i.id === item.id){
          newItems.push(i);
        }
      }

return this.storage.set(itemKey, newItems);
      });
  }

  //delete
  deleteItem(id: number): Promise<Item>{
    return this.storage.get(itemKey).then((items:Item[])=>{
      if(!items || items.length == 0) {
        return null;
      }
      
      let toKeep: Item[] = [];

      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(itemKey, toKeep);
    });
  }
}
