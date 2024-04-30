import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiInputNumberOptionsProvider } from '@taiga-ui/kit';
import { TagService } from '../../common/services/api/tag.service';
import {
  ITreeTagElement,
  ITreeTagShowElement,
  IScopeElement,
  ICreateRating,
  tagScore,
} from '@interfaces';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '@services';

import { TuiAlertService } from '@taiga-ui/core';
import { AppDialogService } from 'src/app/component/dialog/app-dialog.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CreateTagComponent } from './create-tag-modal/create-tag.component';
import { scoringType } from '@enums';

@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiInputNumberOptionsProvider({ step: 0.25, min: 0 })],
})
export class CreateRatingComponent implements OnInit {
  id: number = 0;

  constructor(
    @Inject(TuiAlertService) private alerts: TuiAlertService,
    private ratingService: RatingService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private appDialogService: AppDialogService,
    private injector: Injector
  ) {}

  tagsValue: ITreeTagShowElement[] = [];
  private tagsScore: tagScore = {};
  readonly rating = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('Среднее', Validators.required),
    hours: new FormControl(0),
  });

  types = Object.keys(scoringType);
  getChildTag(tag: ITreeTagElement): ITreeTagShowElement {
    this.tagsScore[tag.id] = tag.ratingScope || 0;
    return {
      id: tag.id,
      name: tag.name,
      score: tag.ratingScope || 0,
      childs:
        tag.childTags.length > 0
          ? tag.childTags.map((childTag) => this.getChildTag(childTag))
          : [],
    };
  }
  onScoreChange($event: { id: number; score: number }) {
    this.tagsScore[$event.id] = $event.score;
    console.log(this.tagsScore);
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']) || -5;
    this.update();
  }
   update(){
    this.tagService.getTreeTags(this.id).subscribe((tags) => {
      this.rating.controls.name.setValue(tags.ratingName);
      const key = Object.keys(scoringType).find(
        (k) => scoringType[k as keyof typeof scoringType] === tags.scoringType
      );
      this.rating.controls.type.setValue(key!);
      this.rating.controls.hours.setValue(tags.hourlyUpdate / 60);
      this.tagsValue = tags.tag.map((tag) => this.getChildTag(tag));
      this.cdr.markForCheck();
    });
  }

  onSave(): void {
    if (!this.rating.valid) {
      this.alerts
        .open('', {
          label: 'Введите название',
          status: 'error',
          autoClose: true,
        })
        .subscribe();
      return;
    }

    const name = this.rating.controls.name.value!;
    const hours = this.rating.controls.hours.value || 0;

    const scope: IScopeElement[] = Object.entries(this.tagsScore).map(
      ([tagId, ratingScore]) => ({
        tagId: +tagId,
        ratingScore,
      })
    );

    const ratingBody: ICreateRating = {
      name,
      minuteUpdate: hours * 60,
      scope,
      scoringType:
        scoringType[
          this.rating.controls.type.value! as keyof typeof scoringType
        ],
    };

    const successMessage = this.id < 0 ? 'Успешно создан' : 'Успешно обновлен';
    const errorMessage =
      this.id < 0 ? 'Не удалось создать' : 'Не удалось обновить';

    const ratingObservable =
      this.id < 0
        ? this.ratingService.createRating(ratingBody)
        : this.ratingService.updateRating(this.id, ratingBody);

    ratingObservable.subscribe(
      () => {
        console.log(successMessage);
        this.alerts
          .open('', {
            label: successMessage,
            status: 'success',
            autoClose: true,
          })
          .subscribe();
      },
      (error) => {
        console.error(
          `Failed to ${this.id < 0 ? 'create' : 'update'} rating:`,
          error
        );
        this.alerts
          .open('', {
            label: error.error.message || errorMessage,
            status: 'error',
            autoClose: true,
          })
          .subscribe();
      }
    );
  }
  onCreateTag() {
    this.appDialogService
      .open(
        new PolymorpheusComponent<any, any>(CreateTagComponent, this.injector),
        {
          size: 'm',
          closeable: true,
          title: 'Создание тега',
        }
      )
      .subscribe((value: any) => value === 'created' && this.update());
  }
}
