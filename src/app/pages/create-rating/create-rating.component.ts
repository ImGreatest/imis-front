import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiInputNumberOptionsProvider } from '@taiga-ui/kit';
import { TagService } from '../../common/services/api/tag.service';
import {
  ITreeTagElement,
  ITreeTagShowElement,
  tagScore,
} from '../../common/interfaces/tag/tag.interface';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '../../common/services/api/rating.service';
import {
  ICreateRating,
  IUpdateRating,
} from 'src/app/common/interfaces/rating/rating.interface';
import { IScope } from 'src/app/common/interfaces/rating/rating.interface';
import { TuiAlertService } from '@taiga-ui/core';

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
    private cdr: ChangeDetectorRef
  ) {}

  tagsValue: ITreeTagShowElement[] = [];
  private tagsScore: tagScore = {};
  readonly rating = new FormGroup({
    name: new FormControl('', Validators.required),
    hours: new FormControl(0),
  });

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
    this.tagService.getTreeTags(this.id).subscribe((tags) => {
      this.rating.controls.name.setValue(tags.ratingName);
      this.rating.controls.hours.setValue(tags.hourlyUpdate / 60);
      this.tagsValue = tags.tag.map((tag) => this.getChildTag(tag));
      this.cdr.markForCheck();
    });
  }

  onSave(): void {
    if (!this.rating.valid) {
      this.alerts
          .open('',{
            label: "Введите название",
            status: 'error',
            autoClose: true,
          })
          .subscribe();
      return;
    }

    const name = this.rating.controls.name.value!;
    const hours = this.rating.controls.hours.value || 0;

    const scope: IScope[] = Object.entries(this.tagsScore).map(
      ([tagId, ratingScore]) => ({
        tagId: +tagId,
        ratingScore,
      })
    );

    console.log(name, hours, scope);

    const ratingBody: ICreateRating = {
      name,
      minuteUpdate: hours * 60,
      scope,
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
          .open('',{
            label: error.error.message || errorMessage,
            status: 'error',
            autoClose: true,
          })
          .subscribe();
      }
    );
  }
}
