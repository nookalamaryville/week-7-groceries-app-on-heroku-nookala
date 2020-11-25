import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GroceryServiceProvider } from '../../providers/grocery-service/grocery-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery"

  items = [];
  errorMessage: string;
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public dataService: GroceryServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataCahnged: boolean) => {
      this.loadItems();
    });
  }
  ionViewDidLoad(){
    this.loadItems();
  }
  loadItems(){
    this.dataService.getItems()
      .subscribe(items => this.items = items, error => this.errorMessage = <any>error);
  }
  addItem(){
    this.inputDialogService.showItemPrompt();
  }  
  editItem(item){
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + item._id + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showItemPrompt(item, item._id);
  }
  addModalItem(){
    this.inputDialogService.showModalPrompt();
  }
  editModalItem(item){
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + item._id + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showModalPrompt(item, item._id);
  }
  shareItem(item){
    console.log("Sharing Item - ", item);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name +', ' + item.quantity,
      duration: 3000
    });
    toast.present();
    let message = "Grocery item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via groceries app"
    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared Successfully!");
    }).catch(()=>{
      console.log("Sorry, error while sharing.")
    })
  }
  removeItem(item){
    console.log("Removing Item - ", item.name, item._id);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name +', ' + item.quantity,
      duration: 3000
    });
    toast.present();
    this.dataService.removeitem(item._id);
  }
}
