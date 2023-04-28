import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MapPointInterface} from '../shared/types/map-point.interface'

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportComponent {
  public mapPoints: MapPointInterface[] = [
    {
      geo_x: 48.508918,
      geo_y: 135.16977,
    },
  ]
}
