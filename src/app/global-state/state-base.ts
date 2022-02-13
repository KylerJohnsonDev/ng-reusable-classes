import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/*
 * @class {StateService<T> StateService}
 */
export abstract class StateServiceBase<T> {
  private stateSubject$ = new BehaviorSubject<T | null>(null);

  /*
   * @property {Observable<T>} state$ - state observable
   * @description emits state. Will not emit until state has been set
   */
  state$: Observable<T | null> = this.stateSubject$
    .asObservable()
    .pipe(filter((state) => !!state));

  /*
   *  @function pluckStateProperty
   *  @description returns a property of the state object in an observable stream
   *  @param {K} propertyName
   *  @returns {Observable<T[K]>}
   */
  pluckStateProperty<K extends keyof T>(
    propertyName: K
  ): Observable<T[K] | null> {
    return this.state$.pipe(
      filter((state) => !!state),
      map((state) => {
        return (state?.[propertyName] as T[K]) ?? null;
      })
    );
  }

  /*
   *  @function setState
   *  @description Updates state
   *  @param {(T|Partial<T>)} state
   */
  protected setState(state: T | Partial<T>): void {
    const currentState = this.stateSubject$.value;
    const newState = { ...currentState, ...state } as T;
    this.stateSubject$.next(newState);
  }

  /*
   *  @function getStateCopy
   *  @description immutably gets copy of current state value
   *  @returns {T}
   */
  protected getStateCopy(): T | null {
    const currentState = { ...this.stateSubject$.value };
    if (currentState) return currentState as T;
    return null;
  }

  /*
   *  @function resetState
   *  @description resets state to null
   */
  protected resetState(): void {
    this.stateSubject$.next(null);
  }

  protected endStateObservation(): void {
    this.stateSubject$.complete();
  }
}
