import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuList: any[] = [
    { 'title': 'Home', 'isActive': 'true', 'navigate': '' },
    { 'title': 'Shop', 'isActive': 'false', 'navigate': '/shop' },
    { 'title': 'Contact Us', 'isActive': 'false', 'navigate': '/contact' },
  ];
  constructor() {

  }
  ngOnInit(): void {
  }
  updateMenu(menuTarget: any) {
    this.menuList.forEach(menu => {
      menu.isActive = 'false';
    });
    menuTarget.isActive = 'true';
  }
}
