import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiInputCountOptionsProvider } from '@taiga-ui/kit';



@Component({
  selector: 'create-rating',
  templateUrl: './create-rating.component.html',
  styleUrl: './create-rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputCountOptionsProvider({
        icons: {
            up: 'tuiIconChevronUp',
            down: 'tuiIconChevronDown',
        },
        appearance: 'secondary',
        step: 10,
        min: 10,
        max: 100,
    }),
],
})
export class CreateRatingComponent {
  form = new FormGroup({
    hour: new FormControl(10, Validators.required),
});
}
