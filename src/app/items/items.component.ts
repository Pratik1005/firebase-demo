import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  itemToEdit: Item;
  editState: boolean = false;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    })
  }

  deleteItem(item) {
    this.itemService.deleteItem(item);
  }

  updateItem(item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  onUpdate(item) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }

}
