import { Observable } from 'rxjs';

export interface AppDialogOptions {
  readonly title?: string;
  readonly data?: any;
  readonly dismissible?: boolean | Observable<boolean>;
  readonly size?: 's' | 'm' | 'l';
  readonly closeable?: boolean | Observable<boolean>;
  readonly maxWidth?: number;
}
