import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  tuiPure,
  TuiStringHandler,
  TuiContextWithImplicit,
} from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { delay, of } from 'rxjs';
import { TagService } from '../../../common/services/api/tag.service';
import { ICreateTag, ITag } from '@interfaces';

@Component({
  selector: 'create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTagComponent implements OnInit {
  items: ITag[] = [];
  readonly form = new FormGroup({
    baseTagControl: new FormControl(-1),
    nameControl: new FormControl('', Validators.required),
    descriptionControl: new FormControl(''),
  });
  @tuiPure
  stringify(
    items: { id: number; name: string; description: string }[]
  ): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [number, string])
    );
    return ({ $implicit }: TuiContextWithImplicit<number>) =>
      map.get($implicit) || '';
  }
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    @Inject(TuiAlertService) private alerts: TuiAlertService,
    private readonly tagService: TagService
  ) {}
  ngOnInit(): void {
    this.tagService.getAll().subscribe((tags) => {
      this.items = [{ id: -1, name: 'Нет', description: '' }, ...tags];
    });
  }
  onSave() {
    if (!this.form.valid) {
      this.alerts
        .open('', {
          label: 'Введите название',
          status: 'error',
          autoClose: true,
        })
        .subscribe();
      return;
    }
    const formValue = this.form.value;
    const tag: ICreateTag = {
      name: formValue.nameControl!,
      description: formValue.descriptionControl ?? '',
    };
    if (formValue.baseTagControl !== -1) {
      tag.baseTagId = formValue.baseTagControl!;
    }
    this.tagService.createTag(tag).subscribe(
      () => {
        this.alerts
          .open('', {
            label: 'Успешно создано',
            status: 'success',
            autoClose: true,
          })
          .subscribe();
        this.context.completeWith('created');
      },
      (error) => {
        this.alerts
          .open('', {
            label: error.error.message || 'Не удалось создать',
            status: 'error',
            autoClose: true,
          })
          .subscribe();
      }
    );
  }
}
