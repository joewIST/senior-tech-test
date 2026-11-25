import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar', standalone: true, imports: [RouterLink],

  templateUrl: './sidebar.component.html',
  styles: [`.sidebar{width:230px;background:#17213b;color:#fff;padding:28px 18px;display:flex;flex-direction:column;box-sizing:border-box}.brand{font-size:18px;font-weight:700;margin:0 0 48px 8px}.brand-mark{background:#7181ef;border-radius:8px;padding:6px 10px;margin-right:8px}.nav-label{font-size:10px;letter-spacing:1.4px;color:#8994b0;padding:0 10px 12px}.nav-item{color:#bfc7dc;text-decoration:none;padding:13px 12px;border-radius:8px;margin-bottom:5px;font-size:13px}.nav-item:hover{background:#273453;color:white}.side-bottom{margin-top:auto;color:#8994b0;font-size:10px;line-height:2;padding:12px}.side-bottom strong{color:white;font-size:12px}.progress{height:4px;background:#394561;border-radius:4px}.progress i{display:block;width:60%;height:4px;background:#7887f0;border-radius:4px}@media(max-width:700px){.sidebar{width:64px;padding:20px 8px}.brand{font-size:0;margin:0 0 40px}.brand-mark{font-size:16px}.nav-label,.nav-item{font-size:0}.side-bottom{display:none}}`]
})
export class SidebarComponent {}
