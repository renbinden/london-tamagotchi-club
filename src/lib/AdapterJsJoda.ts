import "@js-joda/locale_en-gb";
import {
  ChronoField,
  ChronoUnit,
  convert,
  DateTimeFormatter,
  DayOfWeek,
  LocalDate,
  LocalDateTime,
  LocalTime,
  Month,
  TemporalAdjusters,
  Year,
  ZonedDateTime,
  ZoneId,
} from "@js-joda/core";
import type { Locale } from "@js-joda/locale";
import type {
  AdapterFormats,
  AdapterOptions,
  FieldFormatTokenMap,
  MuiPickersAdapter,
  PickersTimezone,
} from "@mui/x-date-pickers/models";

declare module "@mui/x-date-pickers/models" {
  interface PickerValidDateLookup {
    "js-joda": CalendarType;
  }
}

export type CalendarType = LocalDateTime | LocalDate | ZonedDateTime;

const defaultFormats: AdapterFormats = {
  dayOfMonth: "d",
  dayOfMonthFull: "d",
  fullDate: "MMM d, yyyy",
  fullTime12h: "hh:mm a",
  fullTime24h: "HH:mm",
  hours12h: "hh",
  hours24h: "HH",
  meridiem: "a",
  keyboardDate: "yyyy-MM-dd",
  keyboardDateTime12h: "yyyy-MM-dd hh:mm a",
  keyboardDateTime24h: "yyyy-MM-dd HH:mm",
  minutes: "mm",
  month: "MMMM",
  monthShort: "MMM",
  weekday: "EEEE",
  weekdayShort: "EEE",
  normalDate: "d MMMM",
  normalDateWithWeekday: "EEE, MMM d",
  seconds: "ss",
  shortDate: "MMM d",
  year: "yyyy",
};

const formatTokenMap: FieldFormatTokenMap = {
  y: "year",
  yy: "year",
  yyyy: "year",
  M: "month",
  MM: "month",
  MMM: { sectionType: "month", contentType: "letter" },
  MMMM: { sectionType: "month", contentType: "letter" },
  d: "day",
  dd: "day",
  u: "weekDay",
  E: { sectionType: "weekDay", contentType: "letter" },
  EEEE: { sectionType: "weekDay", contentType: "letter" },
  A: "meridiem",
  a: "meridiem",
  H: "hours",
  HH: "hours",
  h: "hours",
  hh: "hours",
  k: "hours",
  kk: "hours",
  m: "minutes",
  mm: "minutes",
  s: "seconds",
  ss: "seconds",
};

const startOfDay = Symbol("startOfDay");

declare module "@js-joda/core" {
  interface Temporal {
    [startOfDay]?: boolean;
  }
}

export class AdapterJsJoda implements MuiPickersAdapter<Locale> {
  public isMUIAdapter = true;
  public isTimezoneCompatible = true;
  public lib = "js-joda";
  public locale: Locale;
  public formats: AdapterFormats;
  public escapedCharacters = { start: "[", end: "]" };
  public formatTokenMap = formatTokenMap;

  constructor({
    locale,
    formats,
  }: AdapterOptions<Locale, never> & { locale: Locale }) {
    if (!locale) {
      throw new Error("adapterLocale is required for AdapterJsJoda");
    }
    this.locale = locale;
    this.formats = { ...defaultFormats, ...formats };
  }

  private formatter = (formatString: string) => {
    let formatter = DateTimeFormatter.ofPattern(formatString);
    if (this.locale) {
      formatter = formatter.withLocale(this.locale);
    }
    return formatter;
  };

  private zone = (timezone: PickersTimezone): ZoneId =>
    timezone === "system" || timezone === "default"
      ? ZoneId.SYSTEM
      : ZoneId.of(timezone);

  private ensureDate = (value: CalendarType): CalendarType =>
    value ?? LocalDateTime.now();

  private getTime = (value: CalendarType, field: ChronoField): number => {
    const v = this.ensureDate(value);
    if (v instanceof LocalDate || v[startOfDay]) {
      return -0;
    }
    return v.get(field);
  };

  private setTime = (
    value: CalendarType,
    field: ChronoField,
    amount: number,
  ): CalendarType => {
    const v = this.ensureDate(value);
    if (v instanceof LocalDate && Object.is(amount, -0)) {
      return v;
    }
    if (v instanceof LocalDate) {
      return LocalDateTime.of(v, LocalTime.of(0, 0, 0).with(field, amount));
    }
    return v.with(field, amount);
  };

  date = <T extends string | null | undefined>(
    value?: T,
    timezone?: PickersTimezone,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any => {
    if (value === null || value === undefined) {
      return null;
    }
    const parsedValue = LocalDateTime.parse(value as string);
    return timezone
      ? ZonedDateTime.of(parsedValue, this.zone(timezone))
      : parsedValue;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getInvalidDate = (): any => LocalDateTime.now();

  getTimezone = (value: CalendarType | null): string =>
    value instanceof ZonedDateTime ? value.zone().id() : "system";

  setTimezone = (
    value: CalendarType,
    timezone: PickersTimezone,
  ): CalendarType => {
    const v = this.ensureDate(value);
    if (v instanceof LocalDate) {
      return v;
    }
    if (v instanceof LocalDateTime) {
      return ZonedDateTime.of(v, this.zone(timezone));
    }
    return v.withZoneSameInstant(this.zone(timezone));
  };

  toJsDate = (value: CalendarType): Date =>
    convert(this.ensureDate(value)).toDate();

  parse = (value: string, format: string): CalendarType | null => {
    try {
      const timeFields = [
        ChronoField.HOUR_OF_DAY,
        ChronoField.MINUTE_OF_HOUR,
        ChronoField.SECOND_OF_MINUTE,
      ];
      const dateFields = [
        ChronoField.DAY_OF_MONTH,
        ChronoField.MONTH_OF_YEAR,
        ChronoField.YEAR,
      ];

      const accessor = this.formatter(format).parse(value);
      const timeFieldCount = timeFields.filter((f) =>
        accessor.isSupported(f),
      ).length;
      const dateFieldCount = dateFields.filter((f) =>
        accessor.isSupported(f),
      ).length;

      if (
        timeFieldCount === timeFields.length &&
        dateFieldCount === dateFields.length
      ) {
        return LocalDateTime.from(accessor);
      }
      if (timeFieldCount === timeFields.length) {
        return LocalTime.from(accessor) as unknown as CalendarType;
      }

      let result: LocalDateTime | LocalDate = timeFieldCount
        ? LocalDateTime.now().with(ChronoField.MILLI_OF_SECOND, 0)
        : LocalDate.now();
      [timeFields, dateFields].forEach((fields) =>
        fields.forEach((field) => {
          if (accessor.isSupported(field)) {
            result = result.with(field, accessor.get(field));
          }
        }),
      );
      return result;
    } catch {
      return null;
    }
  };

  getCurrentLocaleCode = (): string => this.locale.toString();

  is12HourCycleInCurrentLocale = (): boolean => true;

  expandFormat = (format: string): string => format;

  isValid = (value: CalendarType | null): value is CalendarType => !!value;

  format = (value: CalendarType, formatKey: keyof AdapterFormats): string =>
    this.formatByString(value, this.formats[formatKey]);

  formatByString = (value: CalendarType, formatString: string): string =>
    this.formatter(formatString).format(this.ensureDate(value));

  formatNumber = (numberToFormat: string): string => numberToFormat;

  private compareWithCoerce = (
    value: CalendarType,
    comparing: CalendarType,
    op: "equals" | "isAfter" | "isBefore",
  ): boolean => {
    const v = this.ensureDate(value);
    const c = this.ensureDate(comparing);
    if (v instanceof LocalDateTime && c instanceof ZonedDateTime) {
      return v[op](c.toLocalDateTime());
    }
    if (
      v instanceof LocalDate &&
      (c instanceof ZonedDateTime || c instanceof LocalDateTime)
    ) {
      return v[op](LocalDate.from(c));
    }
    if (v instanceof ZonedDateTime && c instanceof LocalDateTime) {
      return v.toLocalDateTime()[op](c);
    }
    if (
      (v instanceof ZonedDateTime || v instanceof LocalDateTime) &&
      c instanceof LocalDate
    ) {
      return LocalDate.from(v)[op](c);
    }
    return v[op](c);
  };

  isEqual = (
    value: CalendarType | null,
    comparing: CalendarType | null,
  ): boolean =>
    (value === null && comparing === null) ||
    (!!value &&
      !!comparing &&
      this.compareWithCoerce(value, comparing, "equals"));

  isSameYear = (value: CalendarType, comparing: CalendarType): boolean =>
    Year.from(this.ensureDate(value)).equals(
      Year.from(this.ensureDate(comparing)),
    );

  isSameMonth = (value: CalendarType, comparing: CalendarType): boolean =>
    Month.from(this.ensureDate(value)).equals(
      Month.from(this.ensureDate(comparing)),
    );

  isSameDay = (value: CalendarType, comparing: CalendarType): boolean =>
    LocalDate.from(this.ensureDate(value)).equals(
      LocalDate.from(this.ensureDate(comparing)),
    );

  isSameHour = (value: CalendarType, comparing: CalendarType): boolean => {
    const v = this.ensureDate(value);
    const c = this.ensureDate(comparing);
    if (v instanceof LocalDate && c instanceof LocalDate) {
      return true;
    }
    if (v instanceof LocalDate || c instanceof LocalDate) {
      return false;
    }
    return this.compareWithCoerce(
      v.truncatedTo(ChronoUnit.MINUTES),
      c.truncatedTo(ChronoUnit.MINUTES),
      "equals",
    );
  };

  isAfter = (value: CalendarType, comparing: CalendarType): boolean =>
    this.compareWithCoerce(value, comparing, "isAfter");

  isAfterYear = (value: CalendarType, comparing: CalendarType): boolean =>
    Year.from(this.ensureDate(value)).isAfter(
      Year.from(this.ensureDate(comparing)),
    );

  isAfterDay = (value: CalendarType, comparing: CalendarType): boolean =>
    LocalDate.from(this.ensureDate(value)).isAfter(
      LocalDate.from(this.ensureDate(comparing)),
    );

  isBefore = (value: CalendarType, comparing: CalendarType): boolean =>
    this.compareWithCoerce(value, comparing, "isBefore");

  isBeforeYear = (value: CalendarType, comparing: CalendarType): boolean =>
    Year.from(this.ensureDate(value)).isBefore(
      Year.from(this.ensureDate(comparing)),
    );

  isBeforeDay = (value: CalendarType, comparing: CalendarType): boolean =>
    LocalDate.from(this.ensureDate(value)).isBefore(
      LocalDate.from(this.ensureDate(comparing)),
    );

  isWithinRange = (
    value: CalendarType,
    range: [CalendarType, CalendarType],
  ): boolean =>
    !this.isBefore(value, range[0]) && !this.isAfter(value, range[1]);

  startOfYear = (value: CalendarType): CalendarType =>
    this.startOfDay(this.ensureDate(value)).with(ChronoField.DAY_OF_YEAR, 1);

  startOfMonth = (value: CalendarType): CalendarType =>
    this.startOfDay(this.ensureDate(value).with(ChronoField.DAY_OF_MONTH, 1));

  startOfWeek = (value: CalendarType): CalendarType =>
    this.startOfDay(
      this.ensureDate(value).with(
        TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY),
      ),
    );

  startOfDay = (value: CalendarType): CalendarType => {
    const v = this.ensureDate(value);
    return v instanceof LocalDate ? v : v.with(ChronoField.NANO_OF_DAY, 0);
  };

  endOfYear = (value: CalendarType): CalendarType =>
    this.endOfDay(
      this.ensureDate(value).with(TemporalAdjusters.lastDayOfYear()),
    );

  endOfMonth = (value: CalendarType): CalendarType =>
    this.endOfDay(
      this.ensureDate(value).with(TemporalAdjusters.lastDayOfMonth()),
    );

  endOfWeek = (value: CalendarType): CalendarType =>
    this.endOfDay(
      this.ensureDate(value)
        .with(TemporalAdjusters.next(DayOfWeek.SUNDAY))
        .minus(1, ChronoUnit.DAYS),
    );

  endOfDay = (value: CalendarType): CalendarType => {
    const v = this.ensureDate(value);
    return v instanceof LocalDate
      ? v
      : v.with(ChronoField.NANO_OF_DAY, 86_399_999_999_999);
  };

  addYears = (value: CalendarType, amount: number): CalendarType =>
    this.ensureDate(value).plus(amount, ChronoUnit.YEARS);

  addMonths = (value: CalendarType, amount: number): CalendarType =>
    this.ensureDate(value).plus(amount, ChronoUnit.MONTHS);

  addWeeks = (value: CalendarType, amount: number): CalendarType =>
    this.ensureDate(value).plus(amount, ChronoUnit.WEEKS);

  addDays = (value: CalendarType, amount: number): CalendarType =>
    this.ensureDate(value).plus(amount, ChronoUnit.DAYS);

  addHours = (value: CalendarType, amount: number): CalendarType =>
    this.ensureDate(value).plus(amount, ChronoUnit.HOURS);

  addMinutes = (value: CalendarType, amount: number): CalendarType =>
    this.ensureDate(value).plus(amount, ChronoUnit.MINUTES);

  addSeconds = (value: CalendarType, amount: number): CalendarType =>
    this.ensureDate(value).plus(amount, ChronoUnit.SECONDS);

  getYear = (value: CalendarType): number =>
    this.ensureDate(value).get(ChronoField.YEAR);

  getMonth = (value: CalendarType): number =>
    this.ensureDate(value).get(ChronoField.MONTH_OF_YEAR) - 1;

  getDate = (value: CalendarType): number =>
    this.ensureDate(value).get(ChronoField.DAY_OF_MONTH);

  getHours = (value: CalendarType): number =>
    this.getTime(this.ensureDate(value), ChronoField.HOUR_OF_DAY);

  getMinutes = (value: CalendarType): number =>
    this.getTime(this.ensureDate(value), ChronoField.MINUTE_OF_HOUR);

  getSeconds = (value: CalendarType): number =>
    this.getTime(this.ensureDate(value), ChronoField.SECOND_OF_MINUTE);

  getMilliseconds = (value: CalendarType): number =>
    this.getTime(this.ensureDate(value), ChronoField.MILLI_OF_SECOND);

  setYear = (value: CalendarType, year: number): CalendarType =>
    this.ensureDate(value).with(ChronoField.YEAR, year);

  setMonth = (value: CalendarType, month: number): CalendarType =>
    this.ensureDate(value).with(ChronoField.MONTH_OF_YEAR, month + 1);

  setDate = (value: CalendarType, date: number): CalendarType =>
    this.ensureDate(value).with(ChronoField.DAY_OF_MONTH, date);

  setHours = (value: CalendarType, hours: number): CalendarType =>
    this.setTime(value, ChronoField.HOUR_OF_DAY, hours);

  setMinutes = (value: CalendarType, minutes: number): CalendarType =>
    this.setTime(value, ChronoField.MINUTE_OF_HOUR, minutes);

  setSeconds = (value: CalendarType, seconds: number): CalendarType =>
    this.setTime(value, ChronoField.SECOND_OF_MINUTE, seconds);

  setMilliseconds = (value: CalendarType, milliseconds: number): CalendarType =>
    this.setTime(value, ChronoField.MILLI_OF_SECOND, milliseconds);

  getDaysInMonth = (value: CalendarType): number =>
    this.ensureDate(value).range(ChronoField.DAY_OF_MONTH).maximum();

  getWeekArray = (value: CalendarType): CalendarType[][] => {
    const v = this.ensureDate(value);
    const date = v instanceof LocalDate ? v : LocalDate.from(v);
    const start = this.startOfWeek(this.startOfMonth(date)) as LocalDate;
    const end = this.endOfWeek(this.endOfMonth(date)) as LocalDate;

    let count = 0;
    let current = start;
    const nestedWeeks: LocalDate[][] = [];

    while (!current.isAfter(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] ||= [];
      nestedWeeks[weekNumber].push(current);
      current = current.plusDays(1);
      count += 1;
    }
    return nestedWeeks;
  };

  getWeekNumber = (value: CalendarType): number => {
    const v = this.ensureDate(value);
    const alignedWeekNumber = v.get(ChronoField.ALIGNED_WEEK_OF_YEAR);
    const dayOfWeek = this.getDayOfWeek(v);
    const firstDayOfWeekOfYear = this.getDayOfWeek(
      v.with(ChronoField.DAY_OF_YEAR, 1),
    );
    return dayOfWeek < firstDayOfWeekOfYear
      ? alignedWeekNumber + 1
      : alignedWeekNumber;
  };

  getDayOfWeek = (value: CalendarType): number =>
    (this.ensureDate(value).get(ChronoField.DAY_OF_WEEK) % 7) + 1;

  getYearRange = (range: [CalendarType, CalendarType]): CalendarType[] => {
    const years: LocalDate[] = [];
    let startYear = Year.from(this.ensureDate(range[0]));
    const endYear = Year.from(this.ensureDate(range[1]));
    while (!startYear.isAfter(endYear)) {
      years.push(startYear.atDay(1));
      startYear = startYear.plusYears(1);
    }
    return years;
  };
}
