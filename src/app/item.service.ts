import { Injectable } from '@angular/core';
import { AngularFirestore, 
         AngularFirestoreCollection, 
         AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from './item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>

  constructor(private afs: AngularFirestore) {
    this.items = this.afs.collection('items').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item
          data.id = a.payload.doc.id;
          return data;
        })
      })
    )
  }

  getItems() {
    return this.items;
  }
}
