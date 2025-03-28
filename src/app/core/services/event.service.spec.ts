import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EventService } from './event.service';
import { IEvent } from '../interfaces/IEvent.interface';
import { NotFoundError } from '../errors/not-found-error';
import { CONSTANTS } from '../constants/constants';
import { UnexpectedError } from '../errors/unexpected-error';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve events from the json file', () => {
    // Arrange
    let httpResponse!: Array<IEvent>;
    const mockEvents: Array<IEvent> = [
      {
        id: '1',
        title: 'test title',
        subtitle: 'test subtitle',
        image: 'test image',
        place: 'test place',
        startDate: '0000000',
        endDate: '11111111',
        description: 'test description',
      },
    ];

    service.getEvents().subscribe({
      next: (events) => {
        httpResponse = events;
      },
    });
    // Act
    const req = httpMock.expectOne('assets/events.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
    // Assert
    expect(httpResponse.length).toBe(mockEvents.length);
    expect(httpResponse).toEqual(mockEvents);
  });

  it('should return an error if the http request fails with 404', () => {
    // Arrange
    let errorResponse!: NotFoundError;
    service.getEvents().subscribe({
      next: () => fail('Should not get the events.'),
      error: (err) => {
        errorResponse = err;
      },
    });
    // Act
    const req = httpMock.expectOne('assets/events.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, {
      status: 404,
      statusText: CONSTANTS.ERROR_MESSAGES.UI.FAILED_TO_LOAD_EVENTS,
    });
    // Assert
    expect(errorResponse).toBeInstanceOf(NotFoundError);
    expect(errorResponse.message).toBe(
      CONSTANTS.ERROR_MESSAGES.UI.FAILED_TO_LOAD_EVENTS,
    );
  });

  it('should return an error if the http request fails with 500', () => {
    // Arrange
    let errorResponse!: UnexpectedError;
    service.getEvents().subscribe({
      next: () => fail('Should not get the events.'),
      error: (err) => {
        errorResponse = err;
      },
    });
    // Act
    const req = httpMock.expectOne('assets/events.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, {
      status: 500,
      statusText: CONSTANTS.ERROR_MESSAGES.UNEXPECTED,
    });
    // Assert
    expect(errorResponse).toBeInstanceOf(UnexpectedError);
    expect(errorResponse.message).toBe(CONSTANTS.ERROR_MESSAGES.UNEXPECTED);
  });
});
