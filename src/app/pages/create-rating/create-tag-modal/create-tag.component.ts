import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  tuiPure,
  TuiStringHandler,
  TuiContextWithImplicit,
} from '@taiga-ui/cdk';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { delay, of } from 'rxjs';

@Component({
  selector: 'create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTagComponent implements OnInit {
  items = [
    'John Cleese',
    'Eric Idle',
    'Michael Palin',
    'Terry Gilliam',
    'Terry Jones',
    'Graham Chapman',
  ];
  readonly form = new FormGroup({
    baseTagControl: new FormControl(''),
    nameControl: new FormControl(''),
  });
  @tuiPure
  stringify(
    items: { id: number; name: string }[]
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string])
    );

    return ({ $implicit }: TuiContextWithImplicit<number>) =>
      map.get($implicit) || '';
  }
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {}
  ngOnInit(): void {}
  onSave() {
    this.context.completeWith(true);
  }
}
