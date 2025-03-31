import { Pipe, PipeTransform } from '@angular/core';
export type OrderDirection = 'ASC' | 'DESC';
@Pipe({
  name: 'orderByDateAsc',
})
export class OrderByDateAscPipe implements PipeTransform {
  transform<T>(
    array: T[],
    property: keyof T,
    order: OrderDirection = 'ASC',
  ): T[] {
    if (!Array.isArray(array) || array.length === 0) return [];

    return [...array].sort((a, b) => {
      const dateA = Number(a[property]);
      const dateB = Number(b[property]);

      return order === 'ASC' ? dateA - dateB : dateB - dateA;
    });
  }
}
