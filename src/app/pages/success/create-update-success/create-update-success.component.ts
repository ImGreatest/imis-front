import { Component, ChangeDetectionStrategy, OnInit, Inject } from "@angular/core";
import { ISuccessModalData } from "@interfaces";
import { TuiDialogContext } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'create-update-success',
    templateUrl: './create-update-success.component.html',
    styleUrls: ['./create-update-success.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class CreateUpdateSuccessComponent implements OnInit {
    constructor(
      @Inject(POLYMORPHEUS_CONTEXT)
      private readonly context: TuiDialogContext<any, ISuccessModalData>,
    ){}
    ngOnInit(): void {
      // this.successId && this._fetchData(this.orderId);
    }

  get successId(): number {
    return this.context.data.successId;
  }

    
  }