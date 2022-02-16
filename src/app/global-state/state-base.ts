import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

export interface StateStoreConfiguration<T> {
  initialState: T;
  debug?: boolean;
  verbose?: boolean;
}

/*
 * @class {StateService<T> StateService}
 */
export abstract class StateStoreBase<T> {
  private stateSubject$!: BehaviorSubject<T>;
  private debug = false;
  private initialState: T;
  private verbose = false;

  /*
   * @property {Observable<T>} state$ - state observable
   * @description emits state. Will not emit until state has been set
   */
  state$: Observable<T>;

  constructor(configuration: StateStoreConfiguration<T>) {
    if (configuration?.debug) this.debug = true;
    if (configuration?.verbose) this.verbose = true;
    if (this.debug) {
      this.log(
        'Setting initial state in constructor',
        configuration.initialState
      );
    }
    this.initialState = configuration.initialState;
    this.stateSubject$ = new BehaviorSubject<T>(configuration.initialState);
    this.state$ = this.stateSubject$.asObservable().pipe(
      tap((state) => {
        if (this.debug) {
          this.log('New state emission', state);
        }
      })
    );
  }

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
    if (this.debug) {
      const message = 'State updated';
      if (this.verbose) {
        this.logStateDiff(message, currentState, newState);
      } else {
        this.log(message);
      }
    }
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
   *  @description resets state to initial state value
   */
  protected resetState(): void {
    this.stateSubject$.next(this.initialState);
    if (this.debug) {
      this.log(
        'State reset to initial state value passed into the constructor',
        this.initialState
      );
    }
  }

  protected endStateObservation(): void {
    this.stateSubject$.complete();
    if (this.debug) {
      this.log('State subject has completed.');
    }
  }

  private log(message: string, object?: any, color?: string): void {
    let coloredMessage = `%c${message}`;
    if (object && this.verbose) {
      const stringifiedObject = JSON.stringify(object, null, 2);
      coloredMessage += `\n${stringifiedObject}`;
    }
    console.log(coloredMessage, `color: ${color ? color : 'green'}`);
  }

  private logStateDiff(
    message: string,
    oldState: T | null,
    newState: T,
    color?: string
  ): void {
    let formattedMessage = `%c${message}`;
    if (oldState && newState) {
      const stateKeys = Object.keys(oldState);
      stateKeys.forEach((key) => {
        const oldPropValue = oldState[key as keyof T];
        const newPropValue = newState[key as keyof T];
        const isUpdated = oldPropValue !== newPropValue;
        if (isUpdated) {
          formattedMessage += `\n${key}: ${JSON.stringify(
            oldPropValue
          )} --> ${JSON.stringify(newPropValue)}`;
        }
      });
    } else {
      formattedMessage += `\nOld State: ${JSON.stringify(
        oldState
      )}\nNew State: ${JSON.stringify(newState)}`;
    }
    console.log(formattedMessage, `color: ${color ? color : 'cyan'}`);
  }
}
