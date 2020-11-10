import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Checkbox, ModalController } from 'ionic-angular';
import { GroceryServiceProvider } from '../../providers/grocery-service/grocery-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public dataService: GroceryServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }
  
  showModalPrompt(item?, index?) {
    if(item===undefined){
      item = {'name':'','quantity':1};
    }
    const modal = this.modalCtrl.create("ModalPage", {data: item});
    modal.present();
    modal.onDidDismiss(data=>{ //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
      if(data!==undefined) {
        if(index !== undefined){
          this.dataService.editItem(data, index);
        }
        else{
          this.dataService.addItem(data);
        }
      }
    })
  }
  showItemPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      title: item? 'Edit Item' : 'Add Item',
      message: item? "Please edit item..." : "Please enter gorcery item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            if(index !== undefined){
              this.dataService.editItem(item, index);
            }
            else{
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
