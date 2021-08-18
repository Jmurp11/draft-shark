import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FolderListComponent implements OnInit {

  @Input()
  folders: any[];

  constructor() { }

  ngOnInit() {}

}
