export interface Worker {
    id: string;
    name: string;
    maxHoursPerWeek: number;
    qualifications: string[];
    preferences?: {
      preferredShifts: ShiftType[];
      unavailableDays: Date[];
    };
  }
  
export enum ShiftType {
    MORNING = 'MORNING',
    AFTERNOON = 'AFTERNOON',
    NIGHT = 'NIGHT'
  }
  
export interface Shift {
    type: ShiftType;
    startTime: string;
    endTime: string;
    minWorkers: number;
    maxWorkers: number;
  }
  
export interface SchedulingConstraints {
    minRestHoursBetweenShifts: number;
    maxConsecutiveWorkDays: number;
    maxShiftsPerWeek: number;
  }
