import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskDatetime {
  toUtcIso(localDate: string): string | null {
    if (!localDate) {
      return null;
    }

    const date = this.parseDateOnly(localDate);
    if (!date) {
      return null;
    }

    return date.toISOString();
  }

  toDisplayLocal(utcIso: string | null): string {
    if (!utcIso) {
      return 'No due date';
    }

    const date = new Date(utcIso);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  fromUtcIsoToInputValue(utcIso: string | null): string {
    if (!utcIso) {
      return '';
    }

    const date = new Date(utcIso);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseDateOnly(localDate: string): Date | null {
    const match = localDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  }
}
