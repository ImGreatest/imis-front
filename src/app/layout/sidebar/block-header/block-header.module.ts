import {NgModule} from "@angular/core";
import {
  TuiButtonModule
} from '@taiga-ui/experimental';
import {TuiToggleModule, tuiToggleOptionsProvider} from "@taiga-ui/kit";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {BlockHeaderComponent} from "./block-header.component";



@NgModule({
  imports: [
    CommonModule,
    TuiButtonModule,
    RouterLink,
    TuiToggleModule,
  ],
  providers: [
    tuiToggleOptionsProvider({
      icons: {
        toggleOff: ({$implicit}) =>
          $implicit === 'm'
            ? 'tuiIconMoon'
            : 'tuiIconMoonLarge',
        toggleOn: ({$implicit}) =>
          $implicit === 'm' ? 'tuiIconSun' : 'tuiIconSunLarge',
      },
      showIcons: true,
    }),
  ],
  declarations: [BlockHeaderComponent],
  exports: [
    BlockHeaderComponent
  ],
})
export class BlockHeaderModule {}
