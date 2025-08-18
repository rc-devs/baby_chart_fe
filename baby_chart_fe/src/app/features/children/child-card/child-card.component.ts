import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ChildService } from '../../../../shared/services/child.service';
import { Child } from '../../../../shared/models/child';

@Component({
  selector: 'app-child-card',
  imports: [],
  templateUrl: './child-card.component.html',
  styleUrl: './child-card.component.css'
})
export class ChildCardComponent implements OnInit{
  children: WritableSignal<Child[]> = signal<Child[]>([]);

  constructor(private childService: ChildService){}

  ngOnInit(): void {
    this.childService.indexChildren().subscribe((children) => this.children.set(children))
  }

  /* childrenIndexHandler(){
    this.childService.indexChildren()
  } */
}
