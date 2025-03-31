import { IEvent } from 'src/app/core/interfaces/event/IEvent.interface';
import { OrderByDateAscPipe } from './order-by-date-asc.pipe';

describe('OrderByDateAscPipe', () => {
  let pipe: OrderByDateAscPipe;

  beforeEach(() => {
    pipe = new OrderByDateAscPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order the events by endDate ASC by default', () => {
    const originalEvents: Array<IEvent> = [
      { endDate: '50000000000' } as IEvent,
      { endDate: '80000000000' } as IEvent,
      { endDate: '70000000000' } as IEvent,
    ];

    const resultPipe = pipe.transform(originalEvents, 'endDate');
    const timestamps = resultPipe.map((value) => value.endDate);
    expect(timestamps).toEqual(['50000000000', '70000000000', '80000000000']);
  });

  it('should order the events by endDate DESC', () => {
    const originalEvents: Array<IEvent> = [
      { endDate: '50000000000' } as IEvent,
      { endDate: '80000000000' } as IEvent,
      { endDate: '70000000000' } as IEvent,
    ];
    const resultPipe = pipe.transform(originalEvents, 'endDate', 'DESC');
    const timestamps = resultPipe.map((value) => value.endDate);
    expect(timestamps).toEqual(['80000000000', '70000000000', '50000000000']);
  });

  it('should not mutate the original input', () => {
    const events: Array<IEvent> = [
      { endDate: '50000000000' } as IEvent,
      { endDate: '80000000000' } as IEvent,
      { endDate: '70000000000' } as IEvent,
    ];
    const originals: Array<IEvent> = [...events];
    pipe.transform(events, 'endDate');
    expect(events).toEqual(originals);
  });

  it('should return empty array if input is not an array', () => {
    const result = pipe.transform({} as unknown as IEvent[], 'endDate');
    expect(result).toEqual([]);
  });
});
