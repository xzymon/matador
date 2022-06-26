import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {MatCalendar, MatDatepicker} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  NativeDateAdapter
} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DateFnsAdapter, MAT_DATE_FNS_FORMATS} from "@angular/material-date-fns-adapter";
import {FormControl} from "@angular/forms";
import { pl } from 'date-fns/locale';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import {ExampleHeader} from "./example.component";

const dateInputFormat = 'DD/MM/YYYY';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: dateInputFormat
  },
  display: {
    dateInput: dateInputFormat,
    monthLabel: 'MMM',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'yyyy',
    monthYearA11yLabel: 'yyyy'
  },
};

class PickerDateAdapter extends DateFnsAdapter {
  override format(date: Date, displayFormat: Object): string {
    console.log('PickerDateAdapter: date & displayFormat');
    console.log(date);
    console.log(displayFormat);
    console.log(this);
    if (displayFormat === 'input') {
      const ret = format(date,dateInputFormat,{locale : pl});
      console.log('return : ' + ret);
      return ret;
    } else {
      const ret = date.toDateString();
      console.log('return : ' + ret);
      return ret;
    }
  }
}

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: PickerDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
})
export class CalComponent implements OnInit {
  @ViewChild('picker') datepicker!: MatDatepicker<Date>;
  exampleHeader = ExampleHeader;
  date = new FormControl(new Date());

  constructor(private _adapter: DateAdapter<Date>) {
    this._adapter.setLocale(pl);
  }

  ngOnInit(): void {
  }

}

