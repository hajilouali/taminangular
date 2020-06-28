import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'negativeNumber'})

export class NumberFormatPipe implements PipeTransform {
  transform(value: number): number {
    return Math.abs(value)*(-1);
  }
}
