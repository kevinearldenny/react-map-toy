// Simple abstraction for fetching writing resources. Similar to an `Either`
// but more purpose-wrought for dealing with sending data to and fetching data
// from an API.
export interface ResourceEditing<D> {
  readonly data: D;
}
export interface ResourcePending {
  readonly isPending: boolean;
}

export interface ResourceSuccess<T> {
  readonly resource: T;
}
export interface ResourceFailure {
  readonly errorMessage: string;
}
export interface ResourceWritePending<D> {
  readonly data: D;
  readonly isPending: true;
}
export interface ResourceWriteSuccess<D, T> {
  readonly data: D;
  readonly resource: T;
}
export interface ResourceWriteFailure<D> {
  readonly data: D;
  readonly errorMessage: string;
}

export type Resource<T> =
  | ResourcePending
  | ResourceSuccess<T>
  | ResourceFailure;

export type WriteResource<D, T> =
  | ResourceEditing<D>
  | ResourceWritePending<D>
  | ResourceWriteSuccess<D, T>
  | ResourceWriteFailure<D>;
