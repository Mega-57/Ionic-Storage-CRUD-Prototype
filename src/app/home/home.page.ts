import { Component, ViewChild } from '@angular/core';

import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Item[] = [];

  newItem: Item = <Item>{};

  @ViewChild('myList')myList: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  //Create
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('item added!')
      this.loadItems();//or add it into the array directly
    });
  }

  //Read
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  //Update
  updateItem(item: Item) {
    item.value = item.value +=5;
    item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
      this.showToast('item updated!')
      this.myList.closeSlidingItems();
      this.loadItems();
    });
  }

  //Delete
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('item removed!')
      this.myList.closeSlidingItems();
      this.loadItems();
    });
  }

  //Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  
}
