import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

/**
 * Date 객체를 특정 포맷의 문자열 날짜로 변환합니다.
 * @param date 변환할 Date 객체
 * @param pattern 날짜 변환 포맷, 기본값은 'YYYY-MM-DD'
 * @return {string} 변환된 날짜 문자열
 */
export function dateToStr(date: Date, pattern = 'YYYY-MM-DD'): string {
    if (!date || isNaN(date.getTime())) {
        return '';
    }
    return dayjs(date).format(pattern);
}

/**
 * 날짜를 표현하는 문자열을 Date 객체로 변환합니다.
 * 만약 `pattern`이 입력되지 않으면, 다음과 같은 기본 형식들을 지원합니다.
 * 1. ISO 8601 (예: '2023-08-06', '2023-08-06T14:30:00.000Z')
 * 2. RFC 2822 (예: 'Mon, 06 Aug 2023 14:30:00 GMT', 'Mon, 06 Aug 2023 14:30:00 +0900')
 * 3. 밀리초 또는 초 단위 타임스탬프 (예: 1628244600000, 1628244600)
 * 4. 일반적인 날짜 문자열 (예: '2023-08-06', '08/06/2023', '06-Aug-2023')
 * @param value 변환할 날짜 문자열
 * @param pattern 날짜 변환 포맷
 * @return {Date} 변환된 Date 객체
 */
export function strToDate(value: string, pattern?: string): Date {
    try {
        return dayjs(value, {format: pattern}).toDate();
    } catch (e) {
        return new Date('NULL');
    }
}

/**
 * 날짜 문자열을 다른 포맷의 문자열로 변환합니다.
 * 만약 `fromPattern`이 입력되지 않으면, 다음과 같은 기본 형식들을 지원합니다.
 * 1. ISO 8601 (예: '2023-08-06', '2023-08-06T14:30:00.000Z')
 * 2. RFC 2822 (예: 'Mon, 06 Aug 2023 14:30:00 GMT', 'Mon, 06 Aug 2023 14:30:00 +0900')
 * 3. 밀리초 또는 초 단위 타임스탬프 (예: 1628244600000, 1628244600)
 * 4. 일반적인 날짜 문자열 (예: '2023-08-06', '08/06/2023', '06-Aug-2023')
 * @param {string} value - 변환할 날짜 문자열
 * @param {string} toPattern - 출력 문자열 포멧
 * @param {string} fromPattern - 입력 문자열 포멧
 * @return {string} - 변경된 날짜 문자열
 */
export function reformatDateStr(value: string, toPattern: string, fromPattern?: string): string {
    return dateToStr(strToDate(value, fromPattern), toPattern);
}

export declare type DateType = 'dateTime' | 'date' | 'time';

const DatePattern = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm'
};
/**
 * 타입에 따라 해당하는 날짜 포맷 형식을 반환합니다.
 * @param type 날짜 타입('dateTime', 'date', 'time')
 */
export function dateTypeToPattern(type: DateType) {
    if (type === 'dateTime') {
        return `${DatePattern.date} ${DatePattern.time}`;
    } else if (type === 'time') {
        return DatePattern.time;
    }
    return DatePattern.date;
}
