import { Injectable } from '@angular/core';
import { grid } from './grid.model';

const employees: grid[] = [
  {
    Type: 'Transactions',
    Jan: '15,000',
    Feb: '10,000',
    Mar: '10,000',
    Qtr1: '',
    Apr: '10,000',
    May: '10,000',
    Jun: '10,000',
    Qtr2: '',
    Jul: '10,000',
    Aug: '10,000',
    Sep: '10,000',
    Qtr3: '',
    Oct: '10,000',
    Nov: '10,000',
    Dec: '10,000',
    Qtr4: '',
    Annual: '',
  },
  {
    Type: 'AOV',
    Jan: '$75.00',
    Feb: '$75.00',
    Mar: '$75.00',
    Qtr1: '',
    Apr: '$75.00',
    May: '$75.00',
    Jun: '$75.00',
    Qtr2: '',
    Jul: '$75.00',
    Aug: '$75.00',
    Sep: '$75.00',
    Qtr3: '',
    Oct: '$75.00',
    Nov: '$80.00',
    Dec: '$100.00',
    Qtr4: '',
    Annual: '',
  },
  {
    Type: 'TY Total Retail Sales',
    Jan: '',
    Feb: '',
    Mar: '',
    Qtr1: '',
    Apr: '',
    May: '',
    Jun: '',
    Qtr2: '',
    Jul: '',
    Aug: '',
    Sep: '',
    Qtr3: '',
    Oct: '',
    Nov: '',
    Dec: '',
    Qtr4: '',
    Annual: '',
  },
  {
    Type: 'LY Total Retail Sales',
    Jan: '$589,865.00',
    Feb: '$589,865.00',
    Mar: '$589,865.00',
    Qtr1: '',
    Apr: '$589,865.00',
    May: '$589,865.00',
    Jun: '$589,865.00',
    Qtr2: '',
    Jul: '$589,865.00',
    Aug: '$589,865.00',
    Sep: '$589,865.00',
    Qtr3: '',
    Oct: '$589,865.00',
    Nov: '$589,865.00',
    Dec: '$589,865.00',
    Qtr4: '',
    Annual: '',
  },
  {
    Type: '% Growth',
    Jan: '',
    Feb: '',
    Mar: '',
    Qtr1: '',
    Apr: '',
    May: '',
    Jun: '',
    Qtr2: '',
    Jul: '',
    Aug: '',
    Sep: '',
    Qtr3: '',
    Oct: '',
    Nov: '',
    Dec: '',
    Qtr4: '',
    Annual: '',
  },
  {
    Type: 'Total Unit Sales',
    Jan: '18,500',
    Feb: '19,220',
    Mar: '17,818',
    Qtr1: '',
    Apr: '18,000',
    May: '18,000',
    Jun: '18,000',
    Qtr2: '',
    Jul: '19,000',
    Aug: '19,000',
    Sep: '19,000',
    Qtr3: '',
    Oct: '18,000',
    Nov: '19,000',
    Dec: '20,000',
    Qtr4: '',
    Annual: '',
  },
  {
    Type: 'UPT',
    Jan: '',
    Feb: '',
    Mar: '',
    Qtr1: '',
    Apr: '',
    May: '',
    Jun: '',
    Qtr2: '',
    Jul: '',
    Aug: '',
    Sep: '',
    Qtr3: '',
    Oct: '',
    Nov: '',
    Dec: '',
    Qtr4: '',
    Annual: '',
  },
];
JSON.stringify(employees);

@Injectable()
export class Services {
  getEmployees() {
    return employees;
  }
}
