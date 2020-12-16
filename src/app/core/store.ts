import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
  state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(intialState: T) {
    this._state$ = new BehaviorSubject<T>(intialState);
    this.state$ = this._state$.asObservable();
  }

  get State() {
    return this._state$.getValue();
  }

  protected setState(nextState: T): void {
    console.log('Previous State', this.State);
    this._state$.next(nextState);
    console.log('current state', this.State);
  }
}
