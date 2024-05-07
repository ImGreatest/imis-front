import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  TUI_PROMPT,
  TUI_TREE_CONTENT,
  tuiInputNumberOptionsProvider,
  TuiPromptData,
} from '@taiga-ui/kit';
import { ITreeTagElement, ITreeTagShowElement } from '@interfaces';
import { TuiHandler } from '@taiga-ui/cdk';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ExpandModule } from './expand-conponent';
import { TagService } from '@services';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
@Component({
  selector: 'tags-tree',
  templateUrl: './tags-tree.component.html',
  styleUrls: ['./tags-tree.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputNumberOptionsProvider({ step: 0.25 }),
    {
      provide: TUI_TREE_CONTENT,
      useValue: new PolymorpheusComponent(ExpandModule),
    },
  ],
})
export class TagsTreeComponent {
  @Input() tagsValue: ITreeTagShowElement[] | undefined;
  @Output() onScoreChange = new EventEmitter<{
    id: number;
    score: number;
  }>();
  @Output() onDelete = new EventEmitter();

  constructor(
    private readonly tagService: TagService,
    @Inject(TuiAlertService) private alerts: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  tags: ITreeTagShowElement[] = [];
  expanded: boolean = true;
  name = 'some';
  childTags: ITreeTagElement[] = [];

  onChange(id: number, event: any) {
    this.onScoreChange.next({ id: id, score: event });
  }
  readonly handler: TuiHandler<
    ITreeTagShowElement,
    readonly ITreeTagShowElement[]
  > = (item) => item.childs || [];

  delete(id: number) {
    const data: TuiPromptData = {
      content: 'Вы уверены что хотите удалить тег?',
      yes: 'Да',
      no: 'Нет',
    };
    this.dialogs
      .open<boolean>(TUI_PROMPT, {
        label: 'Уверены?',
        size: 's',
        data,
      })
      .subscribe((result) => result && this._delete(id));
  }
  private _delete(id: number) {
    this.tagService.deleteTag(id).subscribe(
      () => {
        this.alerts
          .open('', {
            label: 'Успешно удалено',
            status: 'success',
            autoClose: true,
          })
          .subscribe();

        this.onDelete.emit();
      },
      (error) => {
        this.alerts
          .open('', {
            label: error.error.message || 'Не удалось удалить',
            status: 'error',
            autoClose: true,
          })
          .subscribe();
      }
    );
  }
}
