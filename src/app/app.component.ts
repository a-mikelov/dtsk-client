import {Component, HostListener, OnInit} from '@angular/core'
import {changeScreenSizeAction} from './store/global/actions/change-screen-size.action'
import {Store} from '@ngrx/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dtsk-client'

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.changeScreenSize()
  }

  @HostListener('window:resize', ['$event'])
  changeScreenSize() {
    const xs = window.matchMedia(
      `(min-width: 360px) and (max-width: 639px)`
    ).matches
    const sm = window.matchMedia(
      `(min-width: 640px) and (max-width: 767px)`
    ).matches
    const md = window.matchMedia(
      `(min-width: 768px) and (max-width: 1023px)`
    ).matches
    const lg = window.matchMedia(
      `(min-width: 1024px) and (max-width: 1279px)`
    ).matches
    const xl = window.matchMedia(
      `(min-width: 1280px) and (max-width: 1535px)`
    ).matches
    const xxl = window.matchMedia(`(min-width: 1536px)`).matches

    if (xs) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'xs'}))
    } else if (sm) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'sm'}))
    } else if (md) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'md'}))
    } else if (lg) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'lg'}))
    } else if (xl) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'xl'}))
    } else if (xxl) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'xxl'}))
    }
  }
}
