import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from 'src/app/core/interfaces/IEvent.interface';
export type OrderDirection = 'ASC' | 'DESC';
@Pipe({
  name: 'orderByDateAsc',
})
export class OrderByDateAscPipe implements PipeTransform {
  transform(
    events: Array<IEvent>,
    orderBy: OrderDirection = 'ASC',
  ): Array<IEvent> {
    if (Array.isArray(events)) {
      const clone = [...events];
      clone.sort((a: IEvent, b: IEvent) => {
        const dateA = Number(a.endDate);
        const dateB = Number(b.endDate);

        return orderBy === 'ASC' ? dateA - dateB : dateB - dateA;
      });
      return clone;
    } else {
      return [];
    }
  }
}
