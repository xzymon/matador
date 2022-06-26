import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnChanges,
  OnDestroy, OnInit,
  SimpleChanges
} from "@angular/core";
import {Subject} from "rxjs";
import {MatCalendar} from "@angular/material/datepicker";
import {DateAdapter, MatDateFormats} from "@angular/material/core";
import {takeUntil} from "rxjs/operators";
import {MY_DATE_FORMATS} from "./cal.component";
import {pl} from "date-fns/locale";

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: [
    `
    .example-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .example-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }

    .example-double-arrow .mat-icon {
      margin: -22%;
    }
  `,
  ],
  template: `
    <div class="example-header">
      <button mat-icon-button class="example-double-arrow" (click)="previousClicked('year')">
        <mat-icon>keyboard_arrow_left</mat-icon>
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{yearLabel}}</span>
      <button mat-icon-button class="example-double-arrow" (click)="nextClicked('year')">
        <mat-icon>keyboard_arrow_right</mat-icon>
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
    <div class="example-header">
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{monthLabel}}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeader<D> implements OnDestroy, OnChanges {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    //@Inject(MY_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    this._dateAdapter.setLocale(pl);
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
    console.log('constructed!')
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  get periodLabel() {
    return this._dateAdapter
      //.format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .format(this._calendar.activeDate, 'yyyy')
      .toLocaleUpperCase();
  }

  get monthLabel() {
    //console.log(this._dateFormats);
    //console.log(this._calendar.activeDate);
    const monthL = this._dateAdapter
      //.format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .format(this._calendar.activeDate,"MMM");
      //.toLocaleUpperCase();
    //console.log('monthL:');
    //console.log(monthL);
    return monthL;
  }

  get yearLabel() {
    const yearL = this._dateAdapter
      //.format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .format(this._calendar.activeDate, 'yyyy')
      .toString();
    console.log('yearL:');
    console.log(yearL);
    return yearL;
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
