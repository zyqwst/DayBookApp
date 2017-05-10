export class DateUtils{
    /**当月第一天 */
    public static getFirstDayOfMonth(date:Date):Date{
        date.setDate(1);
        return date;
    }
    /**当月最后一天 */
    public static getLastDayOfMonth(date:Date):Date{
        var currentMonth=date.getMonth();
        var nextMonth=++currentMonth;
        var nextMonthFirstDay:any=new Date(date.getFullYear(),nextMonth,1);
        var oneDay=1000*60*60*24;
        return new Date(nextMonthFirstDay-oneDay);
    }
    /**获取本周第一天 */
    public static getFirstDayOfWeek(date:Date):Date{
        let time = date;
        time.setDate(time.getDate() - time.getDay() + 1);
        return time;
    }
    /**本周最后一天 */
    public static getLastDayOfWeek(date:Date):Date{
        let time = date;
        time.setDate(time.getDate() - time.getDay() + 7);
        return time;
    }
    /**获取本月天数 */
    public static getCountOfMonth(date:Date):number{
       return  date.getDate();
    }
    /**获取第几天后的日期，负数表示几天前 */
    public static getDateAfterDays(days:number):Date{
        let time = new Date();
        time.setDate(time.getDate()+days);
        return time;
    }
    /**获得 日期 00:00:00 */
    public static getBeginDate(date:Date):Date{
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let time = new Date('1900-01-01 00:00:00');
        time.setFullYear(year);
        time.setMonth(month);
        time.setDate(day);
        return new Date(time);        
    }
    /**获得 日期 023：59：59 */
    public static getEndDate(date:Date):Date{
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let time = new Date('1900-01-01 23:59:59');
        time.setFullYear(year);
        time.setMonth(month);
        time.setDate(day);
        return new Date(time);        
    }
}