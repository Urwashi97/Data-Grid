import { Component } from '@angular/core';
import { Services } from './app.service';
import { grid } from './grid.model';
import { VisibleComponentComponent } from './layout/dialog/visible_component/visible-component.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
  providers: [Services],
})
export class AppComponent {
  title = 'Sales Plan';
  dataSource: grid[] = [];
  displayedColumns: any[] = [
    'type',
    'jan',
    'feb',
    'mar',
    'qtr1',
    'apr',
    'may',
    'jun',
    'qtr2',
    'jul',
    'aug',
    'sep',
    'qtr3',
    'oct',
    'nov',
    'dec',
    'qtr4',
    'annual',
  ];

  constructor(service: Services, public dialog: MatDialog) {
    this.dataSource = service.getEmployees();
    this.calulateTy();
    this.calulateQtr();
    this.calulateLy();
    this.calulateTransaction();
    this.calulateAOV();
    this.calculateGrowth();
    this.calculateUPT();
    console.log(this.dataSource);
  }

  getDetail(e) {
    console.log('getDetail', e);
    if (
      e.data.Type == 'Transactions' ||
      e.data.Type == 'AOV' ||
      e.data.Type == 'TY Total Retail Sales' ||
      e.data.Type == 'LY Total Retail Sales' ||
      e.data.Type == '% Growth' ||
      e.data.Type == 'Total Unit Sales' ||
      e.data.Type == 'UPT'
    ) {
    }
  }
  openDialog(e, row): void {
    const parent = e.target.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, e.target);

    const dialogRef = this.dialog.open(VisibleComponentComponent, {
      data: {
        dataSource: this.dataSource,
        dataRow: row,
        index,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result == 'undefined') {
        return;
      }

      console.log(this.dataSource);
      console.log(result);

      for (let i = 0; i < this.dataSource.length; i++) {
        let num = 0;
        for (const keys in this.dataSource[i]) {
          if (num == result.column) {
            if (this.dataSource[i]['Type'] == 'AOV') {
              //^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$
              this.dataSource[i][keys] = this.getLocal1(
                result.values[i].name,
                this.dataSource[i]['Type']
              );
            } else if (this.dataSource[i]['Type'] == 'Transactions') {
              this.dataSource[i][keys] = this.getLocal1(
                result.values[i].name,
                this.dataSource[i]['Type']
              );
            } else {
              this.dataSource[i][keys] = result.values[i].name;
            }

            console.log(result.values[i]);
          }
          num++;
        }
      }
      this.calulateTy();
      this.calulateQtr();
      this.calulateLy();
      this.calulateTransaction();
      this.calulateAOV();
      this.calculateGrowth();
      this.calculateUPT();
      console.log('The dialog was closed');
    });
  }

  calulateTransaction() {
    const janCalculateValue = this.dataSource[0].Jan;
    const febCalculateValue = this.dataSource[0].Feb;
    const marCalculateValue = this.dataSource[0].Mar;
    const aprCalculateValue = this.dataSource[0].Apr;
    const mayCalculateValue = this.dataSource[0].May;
    const junCalculateValue = this.dataSource[0].Jun;
    const julCalculateValue = this.dataSource[0].Jul;
    const augCalculateValue = this.dataSource[0].Aug;
    const sepCalculateValue = this.dataSource[0].Sep;
    const octCalculateValue = this.dataSource[0].Oct;
    const novCalculateValue = this.dataSource[0].Nov;
    const decCalculateValue = this.dataSource[0].Dec;
    const qtr1 = this.dataSource[0].Qtr1;
    const qtr2 = this.dataSource[0].Qtr2;
    const qtr3 = this.dataSource[0].Qtr3;
    const qtr4 = this.dataSource[0].Qtr4;

    this.dataSource[0].Qtr1 = (
      this.getReverseLocal(janCalculateValue) +
      this.getReverseLocal(febCalculateValue) +
      this.getReverseLocal(marCalculateValue)
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    this.dataSource[0].Qtr2 = (
      this.getReverseLocal(aprCalculateValue) +
      this.getReverseLocal(mayCalculateValue) +
      this.getReverseLocal(junCalculateValue)
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    this.dataSource[0].Qtr3 = (
      this.getReverseLocal(julCalculateValue) +
      this.getReverseLocal(augCalculateValue) +
      this.getReverseLocal(sepCalculateValue)
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    this.dataSource[0].Qtr4 = (
      this.getReverseLocal(octCalculateValue) +
      this.getReverseLocal(novCalculateValue) +
      this.getReverseLocal(decCalculateValue)
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    this.dataSource[0].Annual = (
      this.getReverseLocal(qtr1) +
      this.getReverseLocal(qtr2) +
      this.getReverseLocal(qtr3) +
      this.getReverseLocal(qtr4)
    ).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  calulateAOV() {
    const qtrACalculateValue = this.dataSource[0].Qtr1.split('$');
    const qtrBCalculateValue = this.dataSource[2].Qtr1.split('$');
    const qtrCCalculateValue = this.dataSource[0].Qtr2.split('$');
    const qtrDCalculateValue = this.dataSource[2].Qtr2.split('$');
    const qtrECalculateValue = this.dataSource[0].Qtr3.split('$');
    const qtrFCalculateValue = this.dataSource[2].Qtr3.split('$');
    const qtrGCalculateValue = this.dataSource[0].Qtr4.split('$');
    const qtrHCalculateValue = this.dataSource[2].Qtr4.split('$');
    const annaulACalculateValue = this.dataSource[0].Annual.split('$');
    const annaulBCalculateValue = this.dataSource[2].Annual.split('$');
    this.dataSource[1].Qtr1 = this.getLocal(
      this.getReverseLocal(qtrBCalculateValue[1]) /
        this.getReverseLocal(qtrACalculateValue[0])
    );
    this.dataSource[1].Qtr2 = this.getLocal(
      this.getReverseLocal(qtrDCalculateValue[1]) /
        this.getReverseLocal(qtrCCalculateValue[0])
    );
    this.dataSource[1].Qtr3 = this.getLocal(
      this.getReverseLocal(qtrFCalculateValue[1]) /
        this.getReverseLocal(qtrECalculateValue[0])
    );
    this.dataSource[1].Qtr4 = this.getLocal(
      this.getReverseLocal(qtrHCalculateValue[1]) /
        this.getReverseLocal(qtrGCalculateValue[0])
    );
    this.dataSource[1].Annual = this.getLocal(
      this.getReverseLocal(annaulBCalculateValue[1]) /
        this.getReverseLocal(annaulACalculateValue[0])
    );
  }

  calulateQtr() {
    for (let i = 0; i < this.dataSource.length; i++) {
      const janCalculateValue = this.dataSource[i].Jan.split('$');
      const febCalculateValue = this.dataSource[i].Feb.split('$');
      const marCalculateValue = this.dataSource[i].Mar.split('$');
      const aprCalculateValue = this.dataSource[i].Apr.split('$');
      const mayCalculateValue = this.dataSource[i].May.split('$');
      const junCalculateValue = this.dataSource[i].Jun.split('$');
      const julCalculateValue = this.dataSource[i].Jul.split('$');
      const augCalculateValue = this.dataSource[i].Aug.split('$');
      const sepCalculateValue = this.dataSource[i].Sep.split('$');
      const octCalculateValue = this.dataSource[i].Oct.split('$');
      const novCalculateValue = this.dataSource[i].Nov.split('$');
      const decCalculateValue = this.dataSource[i].Dec.split('$');

      if (this.dataSource[i].Type !== 'AOV') {
        this.dataSource[i].Qtr1 = this.getLocal(
          this.getReverseLocal(
            janCalculateValue.length == 1
              ? janCalculateValue[0]
              : janCalculateValue[1]
          ) +
            this.getReverseLocal(
              febCalculateValue.length == 1
                ? febCalculateValue[0]
                : febCalculateValue[1]
            ) +
            this.getReverseLocal(
              marCalculateValue.length == 1
                ? marCalculateValue[0]
                : marCalculateValue[1]
            )
        );
        this.dataSource[i].Qtr2 = this.getLocal(
          this.getReverseLocal(
            aprCalculateValue.length == 1
              ? aprCalculateValue[0]
              : aprCalculateValue[1]
          ) +
            this.getReverseLocal(
              mayCalculateValue.length == 1
                ? mayCalculateValue[0]
                : mayCalculateValue[1]
            ) +
            this.getReverseLocal(
              junCalculateValue.length == 1
                ? junCalculateValue[0]
                : junCalculateValue[1]
            )
        );
        this.dataSource[i].Qtr3 = this.getLocal(
          this.getReverseLocal(
            julCalculateValue.length == 1
              ? julCalculateValue[0]
              : julCalculateValue[1]
          ) +
            this.getReverseLocal(
              augCalculateValue.length == 1
                ? augCalculateValue[0]
                : augCalculateValue[1]
            ) +
            this.getReverseLocal(
              sepCalculateValue.length == 1
                ? sepCalculateValue[0]
                : sepCalculateValue[1]
            )
        );
        this.dataSource[i].Qtr4 = this.getLocal(
          this.getReverseLocal(
            octCalculateValue.length == 1
              ? octCalculateValue[0]
              : octCalculateValue[1]
          ) +
            this.getReverseLocal(
              novCalculateValue.length == 1
                ? novCalculateValue[0]
                : novCalculateValue[1]
            ) +
            this.getReverseLocal(
              decCalculateValue.length == 1
                ? decCalculateValue[0]
                : decCalculateValue[1]
            )
        );
        const qtr1 = this.dataSource[2].Qtr1;
        const qtr2 = this.dataSource[2].Qtr2;
        const qtr3 = this.dataSource[2].Qtr3;
        const qtr4 = this.dataSource[2].Qtr4;
        const qtr5 = this.dataSource[3].Qtr1;
        const qtr6 = this.dataSource[3].Qtr2;
        const qtr7 = this.dataSource[3].Qtr3;
        const qtr8 = this.dataSource[3].Qtr4;

        this.dataSource[2].Annual = this.getLocal(
          this.getReverseLocal(qtr1) +
            this.getReverseLocal(qtr2) +
            this.getReverseLocal(qtr3) +
            this.getReverseLocal(qtr4)
        );
        this.dataSource[3].Annual = this.getLocal(
          this.getReverseLocal(qtr5) +
            this.getReverseLocal(qtr6) +
            this.getReverseLocal(qtr7) +
            this.getReverseLocal(qtr8)
        );
      }
      if (this.dataSource[i].Type == 'Total Unit Sales') {
        this.dataSource[i].Qtr1 = this.getLocalTest(
          this.getReverseLocal(
            janCalculateValue.length == 1
              ? janCalculateValue[0]
              : janCalculateValue[1]
          ) +
            this.getReverseLocal(
              febCalculateValue.length == 1
                ? febCalculateValue[0]
                : febCalculateValue[1]
            ) +
            this.getReverseLocal(
              marCalculateValue.length == 1
                ? marCalculateValue[0]
                : marCalculateValue[1]
            )
        );
        this.dataSource[i].Qtr2 = this.getLocalTest(
          this.getReverseLocal(
            aprCalculateValue.length == 1
              ? aprCalculateValue[0]
              : aprCalculateValue[1]
          ) +
            this.getReverseLocal(
              mayCalculateValue.length == 1
                ? mayCalculateValue[0]
                : mayCalculateValue[1]
            ) +
            this.getReverseLocal(
              junCalculateValue.length == 1
                ? junCalculateValue[0]
                : junCalculateValue[1]
            )
        );
        this.dataSource[i].Qtr3 = this.getLocalTest(
          this.getReverseLocal(
            julCalculateValue.length == 1
              ? julCalculateValue[0]
              : julCalculateValue[1]
          ) +
            this.getReverseLocal(
              augCalculateValue.length == 1
                ? augCalculateValue[0]
                : augCalculateValue[1]
            ) +
            this.getReverseLocal(
              sepCalculateValue.length == 1
                ? sepCalculateValue[0]
                : sepCalculateValue[1]
            )
        );
        this.dataSource[i].Qtr4 = this.getLocalTest(
          this.getReverseLocal(
            octCalculateValue.length == 1
              ? octCalculateValue[0]
              : octCalculateValue[1]
          ) +
            this.getReverseLocal(
              novCalculateValue.length == 1
                ? novCalculateValue[0]
                : novCalculateValue[1]
            ) +
            this.getReverseLocal(
              decCalculateValue.length == 1
                ? decCalculateValue[0]
                : decCalculateValue[1]
            )
        );
        const qtr1 = this.dataSource[5].Qtr1;
        const qtr2 = this.dataSource[5].Qtr2;
        const qtr3 = this.dataSource[5].Qtr3;
        const qtr4 = this.dataSource[5].Qtr4;

        this.dataSource[5].Annual = this.getLocalTest(
          this.getReverseLocal(qtr1) +
            this.getReverseLocal(qtr2) +
            this.getReverseLocal(qtr3) +
            this.getReverseLocal(qtr4)
        );
      }
    }
  }

  calulateTy() {
    let janCalculateValue1 = this.dataSource[0].Jan.split('$');
    let janCalculateValue = this.dataSource[1].Jan.split('$');
    janCalculateValue1 =
      janCalculateValue1.length == 1
        ? janCalculateValue1[0]
        : janCalculateValue1[1];
    janCalculateValue =
      janCalculateValue.length == 1
        ? janCalculateValue[0]
        : janCalculateValue[1];

    let febCalculateValue1 = this.dataSource[0].Feb.split('$');
    let febCalculateValue = this.dataSource[1].Feb.split('$');
    febCalculateValue1 =
      febCalculateValue1.length == 1
        ? febCalculateValue1[0]
        : febCalculateValue1[1];
    febCalculateValue =
      febCalculateValue.length == 1
        ? febCalculateValue[0]
        : febCalculateValue[1];

    let marCalculateValue1 = this.dataSource[0].Mar.split('$');
    let marCalculateValue = this.dataSource[1].Mar.split('$');
    marCalculateValue1 =
      marCalculateValue1.length == 1
        ? marCalculateValue1[0]
        : marCalculateValue1[1];
    marCalculateValue =
      marCalculateValue.length == 1
        ? marCalculateValue[0]
        : marCalculateValue[1];

    let aprCalculateValue1 = this.dataSource[0].Apr.split('$');
    let aprCalculateValue = this.dataSource[1].Apr.split('$');
    aprCalculateValue1 =
      aprCalculateValue1.length == 1
        ? aprCalculateValue1[0]
        : aprCalculateValue1[1];
    aprCalculateValue =
      aprCalculateValue.length == 1
        ? aprCalculateValue[0]
        : aprCalculateValue[1];

    let mayCalculateValue1 = this.dataSource[0].May.split('$');
    let mayCalculateValue = this.dataSource[1].May.split('$');
    mayCalculateValue1 =
      mayCalculateValue1.length == 1
        ? mayCalculateValue1[0]
        : mayCalculateValue1[1];
    mayCalculateValue =
      mayCalculateValue.length == 1
        ? mayCalculateValue[0]
        : mayCalculateValue[1];

    let junCalculateValue1 = this.dataSource[0].Jun.split('$');
    let junCalculateValue = this.dataSource[1].Jun.split('$');
    junCalculateValue1 =
      junCalculateValue1.length == 1
        ? junCalculateValue1[0]
        : junCalculateValue1[1];
    junCalculateValue =
      junCalculateValue.length == 1
        ? junCalculateValue[0]
        : junCalculateValue[1];

    let julCalculateValue1 = this.dataSource[0].Jul.split('$');
    let julCalculateValue = this.dataSource[1].Jul.split('$');
    julCalculateValue1 =
      julCalculateValue1.length == 1
        ? julCalculateValue1[0]
        : julCalculateValue1[1];
    julCalculateValue =
      julCalculateValue.length == 1
        ? julCalculateValue[0]
        : julCalculateValue[1];

    let augCalculateValue1 = this.dataSource[0].Aug.split('$');
    let augCalculateValue = this.dataSource[1].Aug.split('$');
    augCalculateValue1 =
      augCalculateValue1.length == 1
        ? augCalculateValue1[0]
        : augCalculateValue1[1];
    augCalculateValue =
      augCalculateValue.length == 1
        ? augCalculateValue[0]
        : augCalculateValue[1];

    let sepCalculateValue1 = this.dataSource[0].Sep.split('$');
    let sepCalculateValue = this.dataSource[1].Sep.split('$');
    sepCalculateValue1 =
      sepCalculateValue1.length == 1
        ? sepCalculateValue1[0]
        : sepCalculateValue1[1];
    sepCalculateValue =
      sepCalculateValue.length == 1
        ? sepCalculateValue[0]
        : sepCalculateValue[1];

    let octCalculateValue1 = this.dataSource[0].Oct.split('$');
    let octCalculateValue = this.dataSource[1].Oct.split('$');
    octCalculateValue1 =
      octCalculateValue1.length == 1
        ? octCalculateValue1[0]
        : octCalculateValue1[1];
    octCalculateValue =
      octCalculateValue.length == 1
        ? octCalculateValue[0]
        : octCalculateValue[1];

    let novCalculateValue1 = this.dataSource[0].Nov.split('$');
    let novCalculateValue = this.dataSource[1].Nov.split('$');
    novCalculateValue1 =
      novCalculateValue1.length == 1
        ? novCalculateValue1[0]
        : novCalculateValue1[1];
    novCalculateValue =
      novCalculateValue.length == 1
        ? novCalculateValue[0]
        : novCalculateValue[1];

    let decCalculateValue1 = this.dataSource[0].Dec.split('$');
    let decCalculateValue = this.dataSource[1].Dec.split('$');
    decCalculateValue1 =
      decCalculateValue1.length == 1
        ? decCalculateValue1[0]
        : decCalculateValue1[1];
    decCalculateValue =
      decCalculateValue.length == 1
        ? decCalculateValue[0]
        : decCalculateValue[1];

    const tyJan =
      this.getReverseLocal(janCalculateValue) *
      this.getReverseLocal(janCalculateValue1);
    const tyFeb =
      this.getReverseLocal(febCalculateValue) *
      this.getReverseLocal(febCalculateValue1);
    const tyMar =
      this.getReverseLocal(marCalculateValue) *
      this.getReverseLocal(marCalculateValue1);
    const tyApr =
      this.getReverseLocal(aprCalculateValue) *
      this.getReverseLocal(aprCalculateValue1);
    const tyMay =
      this.getReverseLocal(mayCalculateValue) *
      this.getReverseLocal(mayCalculateValue1);
    const tyJun =
      this.getReverseLocal(junCalculateValue) *
      this.getReverseLocal(junCalculateValue1);
    const tyJul =
      this.getReverseLocal(julCalculateValue) *
      this.getReverseLocal(julCalculateValue1);
    const tyAug =
      this.getReverseLocal(augCalculateValue) *
      this.getReverseLocal(augCalculateValue1);
    const tySep =
      this.getReverseLocal(sepCalculateValue) *
      this.getReverseLocal(sepCalculateValue1);
    const tyOct =
      this.getReverseLocal(octCalculateValue) *
      this.getReverseLocal(octCalculateValue1);
    const tyNov =
      this.getReverseLocal(novCalculateValue) *
      this.getReverseLocal(novCalculateValue1);
    const tyDec =
      this.getReverseLocal(decCalculateValue) *
      this.getReverseLocal(decCalculateValue1);
    console.log(tyJan);

    this.dataSource[2].Jan = this.getLocal(tyJan);
    this.dataSource[2].Feb = this.getLocal(tyFeb);
    this.dataSource[2].Mar = this.getLocal(tyMar);
    this.dataSource[2].Apr = this.getLocal(tyApr);
    this.dataSource[2].May = this.getLocal(tyMay);
    this.dataSource[2].Jun = this.getLocal(tyJun);
    this.dataSource[2].Jul = this.getLocal(tyJul);
    this.dataSource[2].Aug = this.getLocal(tyAug);
    this.dataSource[2].Sep = this.getLocal(tySep);
    this.dataSource[2].Oct = this.getLocal(tyOct);
    this.dataSource[2].Nov = this.getLocal(tyNov);
    this.dataSource[2].Dec = this.getLocal(tyDec);

    /*const marCalculateValue1 = this.dataSource[0].Mar.split();
    const marCalculateValue = this.dataSource[1].Mar.split();

    const tyJan = (parseFloat(this.dataSource[0].Jan) * parseFloat(this.dataSource[1].Jan));
    const tyFeb = (parseFloat(this.dataSource[0].Feb) * parseFloat(this.dataSource[1].Feb));
    const tyMar = (parseFloat(marCalculateValue[0]) * parseFloat(marCalculateValue1[0]));
    const tyQtr1 = (parseFloat(this.dataSource[0].Qtr1) * parseFloat(this.dataSource[1].Qtr1));
    console.log(tyQtr1);
    this.dataSource[2].Jan = '$' + tyJan.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.dataSource[2].Feb = '$' + tyFeb.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.dataSource[2].Mar = '$' + tyMar.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.dataSource[2].Qtr1 = '$' + tyQtr1.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});*/
  }

  calulateLy() {
    const janCalculateValue = this.dataSource[3].Jan.split('$');
    const febCalculateValue = this.dataSource[3].Feb.split('$');
    const marCalculateValue = this.dataSource[3].Mar.split('$');
    const aprCalculateValue = this.dataSource[3].Mar.split('$');
    const mayCalculateValue = this.dataSource[3].Mar.split('$');
    const junCalculateValue = this.dataSource[3].Mar.split('$');
    const julCalculateValue = this.dataSource[3].Mar.split('$');
    const augCalculateValue = this.dataSource[3].Mar.split('$');
    const sepCalculateValue = this.dataSource[3].Mar.split('$');
    const octCalculateValue = this.dataSource[3].Mar.split('$');
    const novCalculateValue = this.dataSource[3].Mar.split('$');
    const decCalculateValue = this.dataSource[3].Mar.split('$');

    this.dataSource[3].Qtr1 =
      '$' +
      (
        this.getReverseLocal(janCalculateValue[1]) +
        this.getReverseLocal(febCalculateValue[1]) +
        this.getReverseLocal(marCalculateValue[1])
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    this.dataSource[3].Qtr2 =
      '$' +
      (
        this.getReverseLocal(aprCalculateValue[1]) +
        this.getReverseLocal(mayCalculateValue[1]) +
        this.getReverseLocal(junCalculateValue[1])
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    this.dataSource[3].Qtr3 =
      '$' +
      (
        this.getReverseLocal(julCalculateValue[1]) +
        this.getReverseLocal(augCalculateValue[1]) +
        this.getReverseLocal(sepCalculateValue[1])
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    this.dataSource[3].Qtr4 =
      '$' +
      (
        this.getReverseLocal(octCalculateValue[1]) +
        this.getReverseLocal(novCalculateValue[1]) +
        this.getReverseLocal(decCalculateValue[1])
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }

  calculateGrowth() {
    let janCalculateValue1 = this.dataSource[2].Jan.split('$');
    let janCalculateValue = this.dataSource[3].Jan.split('$');
    janCalculateValue1 =
      janCalculateValue1.length == 2
        ? janCalculateValue1[1]
        : janCalculateValue1[0];
    janCalculateValue =
      janCalculateValue.length == 2
        ? janCalculateValue[1]
        : janCalculateValue[0];

    let febCalculateValue1 = this.dataSource[2].Feb.split('$');
    let febCalculateValue = this.dataSource[3].Feb.split('$');
    febCalculateValue1 =
      febCalculateValue1.length == 2
        ? febCalculateValue1[1]
        : febCalculateValue1[0];
    febCalculateValue =
      febCalculateValue.length == 2
        ? febCalculateValue[1]
        : febCalculateValue[0];

    let marCalculateValue1 = this.dataSource[2].Mar.split('$');
    let marCalculateValue = this.dataSource[3].Mar.split('$');
    marCalculateValue1 =
      marCalculateValue1.length == 2
        ? marCalculateValue1[1]
        : marCalculateValue1[0];
    marCalculateValue =
      marCalculateValue.length == 2
        ? marCalculateValue[1]
        : marCalculateValue[0];

    let aprCalculateValue1 = this.dataSource[2].Apr.split('$');
    let aprCalculateValue = this.dataSource[3].Apr.split('$');
    aprCalculateValue1 =
      aprCalculateValue1.length == 2
        ? aprCalculateValue1[1]
        : aprCalculateValue1[0];
    aprCalculateValue =
      aprCalculateValue.length == 2
        ? aprCalculateValue[1]
        : aprCalculateValue[0];

    let mayCalculateValue1 = this.dataSource[2].May.split('$');
    let mayCalculateValue = this.dataSource[3].May.split('$');
    mayCalculateValue1 =
      mayCalculateValue1.length == 2
        ? mayCalculateValue1[1]
        : mayCalculateValue1[0];
    mayCalculateValue =
      mayCalculateValue.length == 2
        ? mayCalculateValue[1]
        : mayCalculateValue[0];

    let junCalculateValue1 = this.dataSource[2].Jun.split('$');
    let junCalculateValue = this.dataSource[3].Jun.split('$');
    junCalculateValue1 =
      junCalculateValue1.length == 2
        ? junCalculateValue1[1]
        : junCalculateValue1[0];
    junCalculateValue =
      junCalculateValue.length == 2
        ? junCalculateValue[1]
        : junCalculateValue[0];

    let julCalculateValue1 = this.dataSource[2].Jul.split('$');
    let julCalculateValue = this.dataSource[3].Jul.split('$');
    julCalculateValue1 =
      julCalculateValue1.length == 2
        ? julCalculateValue1[1]
        : julCalculateValue1[0];
    julCalculateValue =
      julCalculateValue.length == 2
        ? julCalculateValue[1]
        : julCalculateValue[0];

    let augCalculateValue1 = this.dataSource[2].Aug.split('$');
    let augCalculateValue = this.dataSource[3].Aug.split('$');
    augCalculateValue1 =
      augCalculateValue1.length == 2
        ? augCalculateValue1[1]
        : augCalculateValue1[0];
    augCalculateValue =
      augCalculateValue.length == 2
        ? augCalculateValue[1]
        : augCalculateValue[0];

    let sepCalculateValue1 = this.dataSource[2].Sep.split('$');
    let sepCalculateValue = this.dataSource[3].Sep.split('$');
    sepCalculateValue1 =
      sepCalculateValue1.length == 2
        ? sepCalculateValue1[1]
        : sepCalculateValue1[0];
    sepCalculateValue =
      sepCalculateValue.length == 2
        ? sepCalculateValue[1]
        : sepCalculateValue[0];

    let octCalculateValue1 = this.dataSource[2].Oct.split('$');
    let octCalculateValue = this.dataSource[3].Oct.split('$');
    octCalculateValue1 =
      octCalculateValue1.length == 2
        ? octCalculateValue1[1]
        : octCalculateValue1[0];
    octCalculateValue =
      octCalculateValue.length == 2
        ? octCalculateValue[1]
        : octCalculateValue[0];

    let novCalculateValue1 = this.dataSource[2].Nov.split('$');
    let novCalculateValue = this.dataSource[3].Nov.split('$');
    novCalculateValue1 =
      novCalculateValue1.length == 2
        ? novCalculateValue1[1]
        : novCalculateValue1[0];
    novCalculateValue =
      novCalculateValue.length == 2
        ? novCalculateValue[1]
        : novCalculateValue[0];

    let decCalculateValue1 = this.dataSource[2].Dec.split('$');
    let decCalculateValue = this.dataSource[3].Dec.split('$');
    decCalculateValue1 =
      decCalculateValue1.length == 2
        ? decCalculateValue1[1]
        : decCalculateValue1[0];
    decCalculateValue =
      decCalculateValue.length == 2
        ? decCalculateValue[1]
        : decCalculateValue[0];

    let qtr1CalculateValue1 = this.dataSource[2].Qtr1.split('$');
    let qtr1CalculateValue = this.dataSource[3].Qtr1.split('$');
    qtr1CalculateValue1 =
      qtr1CalculateValue1.length == 2
        ? qtr1CalculateValue1[1]
        : qtr1CalculateValue1[0];
    qtr1CalculateValue =
      qtr1CalculateValue.length == 2
        ? qtr1CalculateValue[1]
        : qtr1CalculateValue[0];

    let qtr2CalculateValue1 = this.dataSource[2].Qtr2.split('$');
    let qtr2CalculateValue = this.dataSource[3].Qtr2.split('$');
    qtr2CalculateValue1 =
      qtr2CalculateValue1.length == 2
        ? qtr2CalculateValue1[1]
        : qtr2CalculateValue1[0];
    qtr2CalculateValue =
      qtr2CalculateValue.length == 2
        ? qtr2CalculateValue[1]
        : qtr2CalculateValue[0];

    let qtr3CalculateValue1 = this.dataSource[2].Qtr3.split('$');
    let qtr3CalculateValue = this.dataSource[3].Qtr3.split('$');
    qtr3CalculateValue1 =
      qtr3CalculateValue1.length == 2
        ? qtr3CalculateValue1[1]
        : qtr3CalculateValue1[0];
    qtr3CalculateValue =
      qtr3CalculateValue.length == 2
        ? qtr3CalculateValue[1]
        : qtr3CalculateValue[0];

    let qtr4CalculateValue1 = this.dataSource[2].Qtr4.split('$');
    let qtr4CalculateValue = this.dataSource[3].Qtr4.split('$');
    qtr4CalculateValue1 =
      qtr4CalculateValue1.length == 2
        ? qtr4CalculateValue1[1]
        : qtr4CalculateValue1[0];
    qtr4CalculateValue =
      qtr4CalculateValue.length == 2
        ? qtr4CalculateValue[1]
        : qtr4CalculateValue[0];

    let annualCalculateValue1 = this.dataSource[2].Annual.split('$');
    let annualCalculateValue = this.dataSource[3].Annual.split('$');
    annualCalculateValue1 =
      annualCalculateValue1.length == 2
        ? annualCalculateValue1[1]
        : annualCalculateValue1[0];
    annualCalculateValue =
      annualCalculateValue.length == 2
        ? annualCalculateValue[1]
        : annualCalculateValue[0];

    const tyJan =
      (this.getReverseLocal(janCalculateValue1) /
        this.getReverseLocal(janCalculateValue)) *
        100 -
      100;
    const tyFeb =
      (this.getReverseLocal(febCalculateValue1) /
        this.getReverseLocal(febCalculateValue)) *
        100 -
      100;
    const tyMar =
      (this.getReverseLocal(marCalculateValue1) /
        this.getReverseLocal(marCalculateValue)) *
        100 -
      100;
    const tyApr =
      (this.getReverseLocal(aprCalculateValue1) /
        this.getReverseLocal(aprCalculateValue)) *
        100 -
      100;
    const tyMay =
      (this.getReverseLocal(mayCalculateValue1) /
        this.getReverseLocal(mayCalculateValue)) *
        100 -
      100;
    const tyJun =
      (this.getReverseLocal(junCalculateValue1) /
        this.getReverseLocal(junCalculateValue)) *
        100 -
      100;
    const tyJul =
      (this.getReverseLocal(julCalculateValue1) /
        this.getReverseLocal(julCalculateValue)) *
        100 -
      100;
    const tyAug =
      (this.getReverseLocal(augCalculateValue1) /
        this.getReverseLocal(augCalculateValue)) *
        100 -
      100;
    const tySep =
      (this.getReverseLocal(sepCalculateValue1) /
        this.getReverseLocal(sepCalculateValue)) *
        100 -
      100;
    const tyOct =
      (this.getReverseLocal(octCalculateValue1) /
        this.getReverseLocal(octCalculateValue)) *
        100 -
      100;
    const tyNov =
      (this.getReverseLocal(novCalculateValue1) /
        this.getReverseLocal(novCalculateValue)) *
        100 -
      100;
    const tyDec =
      (this.getReverseLocal(decCalculateValue1) /
        this.getReverseLocal(decCalculateValue)) *
        100 -
      100;
    const tyQtr1 =
      (this.getReverseLocal(qtr1CalculateValue1) /
        this.getReverseLocal(qtr1CalculateValue)) *
        100 -
      100;
    const tyQtr2 =
      (this.getReverseLocal(qtr2CalculateValue1) /
        this.getReverseLocal(qtr2CalculateValue)) *
        100 -
      100;
    const tyQtr3 =
      (this.getReverseLocal(qtr3CalculateValue1) /
        this.getReverseLocal(qtr3CalculateValue)) *
        100 -
      100;
    const tyQtr4 =
      (this.getReverseLocal(qtr4CalculateValue1) /
        this.getReverseLocal(qtr4CalculateValue)) *
        100 -
      100;
    const tyAnnual =
      (this.getReverseLocal(annualCalculateValue1) /
        this.getReverseLocal(annualCalculateValue)) *
        100 -
      100;

    this.dataSource[4].Jan = this.getLocalTest(tyJan) + '%';
    this.dataSource[4].Feb = this.getLocalTest(tyFeb) + '%';
    this.dataSource[4].Mar = this.getLocalTest(tyMar) + '%';
    this.dataSource[4].Apr = this.getLocalTest(tyApr) + '%';
    this.dataSource[4].May = this.getLocalTest(tyMay) + '%';
    this.dataSource[4].Jun = this.getLocalTest(tyJun) + '%';
    this.dataSource[4].Jul = this.getLocalTest(tyJul) + '%';
    this.dataSource[4].Aug = this.getLocalTest(tyAug) + '%';
    this.dataSource[4].Sep = this.getLocalTest(tySep) + '%';
    this.dataSource[4].Oct = this.getLocalTest(tyOct) + '%';
    this.dataSource[4].Nov = this.getLocalTest(tyNov) + '%';
    this.dataSource[4].Dec = this.getLocalTest(tyDec) + '%';
    this.dataSource[4].Qtr1 = this.getLocalTest(tyQtr1) + '%';
    this.dataSource[4].Qtr2 = this.getLocalTest(tyQtr2) + '%';
    this.dataSource[4].Qtr3 = this.getLocalTest(tyQtr3) + '%';
    this.dataSource[4].Qtr4 = this.getLocalTest(tyQtr4) + '%';
    this.dataSource[4].Annual = this.getLocalTest(tyAnnual) + '%';
  }
  calculateUPT() {
    let janCalculateValue1 = this.dataSource[0].Jan.split('$');
    let janCalculateValue = this.dataSource[5].Jan.split('$');
    janCalculateValue1 =
      janCalculateValue1.length == 0
        ? janCalculateValue1[1]
        : janCalculateValue1[0];
    janCalculateValue =
      janCalculateValue.length == 0
        ? janCalculateValue[1]
        : janCalculateValue[0];
    console.log(janCalculateValue1);
    console.log(janCalculateValue);

    let febCalculateValue1 = this.dataSource[0].Feb.split('$');
    let febCalculateValue = this.dataSource[5].Feb.split('$');
    febCalculateValue1 =
      febCalculateValue1.length == 0
        ? febCalculateValue1[1]
        : febCalculateValue1[0];
    febCalculateValue =
      febCalculateValue.length == 0
        ? febCalculateValue[1]
        : febCalculateValue[0];

    let marCalculateValue1 = this.dataSource[0].Mar.split('$');
    let marCalculateValue = this.dataSource[5].Mar.split('$');
    marCalculateValue1 =
      marCalculateValue1.length == 0
        ? marCalculateValue1[1]
        : marCalculateValue1[0];
    marCalculateValue =
      marCalculateValue.length == 0
        ? marCalculateValue[1]
        : marCalculateValue[0];

    let aprCalculateValue1 = this.dataSource[0].Apr.split('$');
    let aprCalculateValue = this.dataSource[5].Apr.split('$');
    aprCalculateValue1 =
      aprCalculateValue1.length == 0
        ? aprCalculateValue1[1]
        : aprCalculateValue1[0];
    aprCalculateValue =
      aprCalculateValue.length == 0
        ? aprCalculateValue[1]
        : aprCalculateValue[0];

    let mayCalculateValue1 = this.dataSource[0].May.split('$');
    let mayCalculateValue = this.dataSource[5].May.split('$');
    mayCalculateValue1 =
      mayCalculateValue1.length == 0
        ? mayCalculateValue1[1]
        : mayCalculateValue1[0];
    mayCalculateValue =
      mayCalculateValue.length == 0
        ? mayCalculateValue[1]
        : mayCalculateValue[0];

    let junCalculateValue1 = this.dataSource[0].Jun.split('$');
    let junCalculateValue = this.dataSource[5].Jun.split('$');
    junCalculateValue1 =
      junCalculateValue1.length == 0
        ? junCalculateValue1[1]
        : junCalculateValue1[0];
    junCalculateValue =
      junCalculateValue.length == 0
        ? junCalculateValue[1]
        : junCalculateValue[0];

    let julCalculateValue1 = this.dataSource[0].Jul.split('$');
    let julCalculateValue = this.dataSource[5].Jul.split('$');
    julCalculateValue1 =
      julCalculateValue1.length == 0
        ? julCalculateValue1[1]
        : julCalculateValue1[0];
    julCalculateValue =
      julCalculateValue.length == 0
        ? julCalculateValue[1]
        : julCalculateValue[0];

    let augCalculateValue1 = this.dataSource[0].Aug.split('$');
    let augCalculateValue = this.dataSource[5].Aug.split('$');
    augCalculateValue1 =
      augCalculateValue1.length == 0
        ? augCalculateValue1[1]
        : augCalculateValue1[0];
    augCalculateValue =
      augCalculateValue.length == 0
        ? augCalculateValue[1]
        : augCalculateValue[0];

    let sepCalculateValue1 = this.dataSource[0].Sep.split('$');
    let sepCalculateValue = this.dataSource[5].Sep.split('$');
    sepCalculateValue1 =
      sepCalculateValue1.length == 2
        ? sepCalculateValue1[1]
        : sepCalculateValue1[0];
    sepCalculateValue =
      sepCalculateValue.length == 2
        ? sepCalculateValue[1]
        : sepCalculateValue[0];

    let octCalculateValue1 = this.dataSource[0].Oct.split('$');
    let octCalculateValue = this.dataSource[5].Oct.split('$');
    octCalculateValue1 =
      octCalculateValue1.length == 2
        ? octCalculateValue1[1]
        : octCalculateValue1[0];
    octCalculateValue =
      octCalculateValue.length == 2
        ? octCalculateValue[1]
        : octCalculateValue[0];

    let novCalculateValue1 = this.dataSource[0].Nov.split('$');
    let novCalculateValue = this.dataSource[5].Nov.split('$');
    novCalculateValue1 =
      novCalculateValue1.length == 2
        ? novCalculateValue1[1]
        : novCalculateValue1[0];
    novCalculateValue =
      novCalculateValue.length == 2
        ? novCalculateValue[1]
        : novCalculateValue[0];

    let decCalculateValue1 = this.dataSource[0].Dec.split('$');
    let decCalculateValue = this.dataSource[5].Dec.split('$');
    decCalculateValue1 =
      decCalculateValue1.length == 0
        ? decCalculateValue1[1]
        : decCalculateValue1[0];
    decCalculateValue =
      decCalculateValue.length == 0
        ? decCalculateValue[1]
        : decCalculateValue[0];

    let qtr1CalculateValue1 = this.dataSource[0].Qtr1.split('$');
    let qtr1CalculateValue = this.dataSource[5].Qtr1.split('$');
    qtr1CalculateValue1 =
      qtr1CalculateValue1.length == 0
        ? qtr1CalculateValue1[1]
        : qtr1CalculateValue1[0];
    qtr1CalculateValue =
      qtr1CalculateValue.length == 0
        ? qtr1CalculateValue[1]
        : qtr1CalculateValue[0];

    let qtr2CalculateValue1 = this.dataSource[0].Qtr2.split('$');
    let qtr2CalculateValue = this.dataSource[5].Qtr2.split('$');
    qtr2CalculateValue1 =
      qtr2CalculateValue1.length == 0
        ? qtr2CalculateValue1[1]
        : qtr2CalculateValue1[0];
    qtr2CalculateValue =
      qtr2CalculateValue.length == 0
        ? qtr2CalculateValue[1]
        : qtr2CalculateValue[0];

    let qtr3CalculateValue1 = this.dataSource[0].Qtr3.split('$');
    let qtr3CalculateValue = this.dataSource[5].Qtr3.split('$');
    qtr3CalculateValue1 =
      qtr3CalculateValue1.length == 2
        ? qtr3CalculateValue1[1]
        : qtr3CalculateValue1[0];
    qtr3CalculateValue =
      qtr3CalculateValue.length == 2
        ? qtr3CalculateValue[1]
        : qtr3CalculateValue[0];

    let qtr4CalculateValue1 = this.dataSource[0].Qtr4.split('$');
    let qtr4CalculateValue = this.dataSource[5].Qtr4.split('$');
    qtr4CalculateValue1 =
      qtr4CalculateValue1.length == 0
        ? qtr4CalculateValue1[1]
        : qtr4CalculateValue1[0];
    qtr4CalculateValue =
      qtr4CalculateValue.length == 0
        ? qtr4CalculateValue[1]
        : qtr4CalculateValue[0];

    let annualCalculateValue1 = this.dataSource[0].Annual.split('$');
    let annualCalculateValue = this.dataSource[5].Annual.split('$');
    annualCalculateValue1 =
      annualCalculateValue1.length == 0
        ? annualCalculateValue1[1]
        : annualCalculateValue1[0];
    annualCalculateValue =
      annualCalculateValue.length == 0
        ? annualCalculateValue[1]
        : annualCalculateValue[0];

    const tyJan =
      this.getReverseLocal(janCalculateValue) /
      this.getReverseLocal(janCalculateValue1);
    const tyFeb =
      this.getReverseLocal(febCalculateValue) /
      this.getReverseLocal(febCalculateValue1);
    const tyMar =
      this.getReverseLocal(marCalculateValue) /
      this.getReverseLocal(marCalculateValue1);
    const tyApr =
      this.getReverseLocal(aprCalculateValue) /
      this.getReverseLocal(aprCalculateValue1);
    const tyMay =
      this.getReverseLocal(mayCalculateValue) /
      this.getReverseLocal(mayCalculateValue1);
    const tyJun =
      this.getReverseLocal(junCalculateValue) /
      this.getReverseLocal(junCalculateValue1);
    const tyJul =
      this.getReverseLocal(julCalculateValue) /
      this.getReverseLocal(julCalculateValue1);
    const tyAug =
      this.getReverseLocal(augCalculateValue) /
      this.getReverseLocal(augCalculateValue1);
    const tySep =
      this.getReverseLocal(sepCalculateValue) /
      this.getReverseLocal(sepCalculateValue1);
    const tyOct =
      this.getReverseLocal(octCalculateValue) /
      this.getReverseLocal(octCalculateValue1);
    const tyNov =
      this.getReverseLocal(novCalculateValue) /
      this.getReverseLocal(novCalculateValue1);
    const tyDec =
      this.getReverseLocal(decCalculateValue) /
      this.getReverseLocal(decCalculateValue1);
    const tyQtr1 =
      this.getReverseLocal(qtr1CalculateValue) /
      this.getReverseLocal(qtr1CalculateValue1);
    const tyQtr2 =
      this.getReverseLocal(qtr2CalculateValue) /
      this.getReverseLocal(qtr2CalculateValue1);
    const tyQtr3 =
      this.getReverseLocal(qtr3CalculateValue) /
      this.getReverseLocal(qtr3CalculateValue1);
    const tyQtr4 =
      this.getReverseLocal(qtr4CalculateValue) /
      this.getReverseLocal(qtr4CalculateValue1);
    const tyAnnual =
      this.getReverseLocal(annualCalculateValue) /
      this.getReverseLocal(annualCalculateValue1);

    this.dataSource[6].Jan = this.getLocalTest(tyJan);
    this.dataSource[6].Feb = this.getLocalTest(tyFeb);
    this.dataSource[6].Mar = this.getLocalTest(tyMar);
    this.dataSource[6].Apr = this.getLocalTest(tyApr);
    this.dataSource[6].May = this.getLocalTest(tyMay);
    this.dataSource[6].Jun = this.getLocalTest(tyJun);
    this.dataSource[6].Jul = this.getLocalTest(tyJul);
    this.dataSource[6].Aug = this.getLocalTest(tyAug);
    this.dataSource[6].Sep = this.getLocalTest(tySep);
    this.dataSource[6].Oct = this.getLocalTest(tyOct);
    this.dataSource[6].Nov = this.getLocalTest(tyNov);
    this.dataSource[6].Dec = this.getLocalTest(tyDec);
    this.dataSource[6].Qtr1 = this.getLocalTest(tyQtr1);
    this.dataSource[6].Qtr2 = this.getLocalTest(tyQtr2);
    this.dataSource[6].Qtr3 = this.getLocalTest(tyQtr3);
    this.dataSource[6].Qtr4 = this.getLocalTest(tyQtr4);
    this.dataSource[6].Annual = this.getLocalTest(tyAnnual);
  }
  getLocal(data) {
    return (
      '$' +
      data.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  getLocal1(data, type) {
    data = data.replaceAll('$', '');
    data = data.replaceAll(',', '');
    data = parseInt(data);

    let reg = /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/;
    if (type == 'Transactions') {
      return data
        .toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
      return '$' + data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    //return '$' + data.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
  getLocalTest(data) {
    return data.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  getReverseLocal(data) {
    if (data.search('$') > -1) {
      data = data.replaceAll('$', '');
    }
    data = data.replaceAll(',', '');
    return parseFloat(data);
  }
}
