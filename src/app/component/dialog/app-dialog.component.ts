import { ChangeDetectionStrategy, Component, Inject, OnInit, Self } from '@angular/core';
import { TuiDestroyService, TuiDialog } from '@taiga-ui/cdk';
import { TuiDialogCloseService, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Observable, takeUntil } from 'rxjs';
import { AppDialogOptions } from './app-dialog.options';
import { TUI_PROMPT } from '@taiga-ui/kit';

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.less'],
  providers: [TuiDestroyService, TuiDialogCloseService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDialogComponent implements OnInit {
  size: 's' | 'm' | 'l' = 'm';
  maxWidth?: number;
  closeable = true;
  title: string | null = null;

  readonly prompt = this.dialogService.open<boolean>(TUI_PROMPT, {
    label: 'Вы уверены?',
    size: 's',
    closeable: true,
    dismissible: true,
  });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<AppDialogOptions, boolean>,
    @Inject(TuiDialogCloseService) close$: Observable<unknown>,
    @Self() @Inject(TuiDestroyService) destroy$: Observable<unknown>,
    @Inject(TuiDialogService)
    private dialogService: TuiDialogService
  ) {
    close$.pipe(takeUntil(destroy$)).subscribe(() => {
      this.prompt.subscribe(value => value && this.context.$implicit.complete());
    });
  }

  onClick(response: boolean): void {
    this.context.completeWith(response);
  }

  onClose(): void {
    this.context.completeWith(false);
  }

  ngOnInit(): void {
    this._setProperty();
  }

  private _setProperty(): void {
    this.title = this.context.title || null;
    this.size = this.context.size || 'm';
    this.maxWidth = this.context.maxWidth;
    this.closeable = !!this.context.closeable;
  }
}
